import React, { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Divider} from "@nextui-org/react";
import './payment.css';  

// Ensure the Razorpay script is loaded
const loadRazorpayScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const PaymentForm = () => {
  const workerName = new URLSearchParams(window.location.search).get('worker');
  const workerId = new URLSearchParams(window.location.search).get('workerId');
  const workerIds = workerId.split(',');
  const userId = new URLSearchParams(window.location.search).get('tzId');
  const [amount, setAmount] = useState(100);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const processPayment = useCallback(async () => {
    if (amount <= 0) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000); // Auto-hide after 3 seconds
      return;
    }

    const orderData = {
      amount: parseInt(amount),
      currency: 'INR',
      receipt: `receipt_${new Date().getTime()}`,
      notes: { workerName, workerIds, userId }
    };

    try {
      const response = await fetch('https://backend.tipzonn.com/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });
      const data = await response.json();
      const orderId = data.orderId;
      const options = {
        amount: amount * 100,
        currency: 'INR',
        name: 'Tipzonn',
        description: 'Tip Payment',
        order_id: orderId,
        theme: {
          color: '#00FFFF'
        },
        handler: async  (response) => {
          console.log('Payment successful:', response);
          
           // Send POST request to update tip information
          try {
            if (workerIds.length > 1) { 
              await fetch(`https://backend.tipzonn.com/api/tips/multiple`, { 
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({  workerIds, amount }) 
              });
            } else {
              await fetch(`https://backend.tipzonn.com/api/tips/${workerId}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({  amount })
              });
            }
            // Redirect to ratings page
            navigate(`/ratings?tzId=${userId}`);
          } catch (error) {
            console.error('Error updating tip information:', error);
          }
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Error creating order:', error);
    }
  }, [amount, workerName, workerIds, userId]);

  useEffect(() => {
    loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js').then((loaded) => {
      if (!loaded) {
        console.error('Razorpay SDK failed to load');
        return;
      }
      document.getElementById('rzp-button1').onclick = processPayment;
    });
  }, [processPayment]);

  const handleKeypadInput = (number) => { 
    setAmount((prevAmount) => { 
      const newAmount = Number(prevAmount.toString() + number.toString()); 
      return newAmount; 
    });
  }; 

  return (
    <div className="container-paymentForm">
      {/* Notification pop-up */}
      {showNotification && (
        <div className={`notification ${showNotification ? 'show' : ''}`}>
          Tipping Amount must be greater than 0
          <button className="close-btn" onClick={() => setShowNotification(false)}>×</button>
        </div>
      )}

      {/* <div className="logo-container">
        <img src="Tipzonnlogo-payment.png" alt="Tipzonn Logo" className="tipzonn-logo" />
      </div> */}
      <div className="header-paymentForm">
        <div className="header-text">
          Tipping <span id="workerName">{workerName}</span>
        </div>
      </div>
      <div className="input-container">
        <span className="rupee-symbol">₹</span>
        <input
          type="number"
          id="paymentAmount"
          className="payment-input"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))} //new comment1
          placeholder="100"
        />
      </div>
        
      <Divider className="my-4" />
      
      <div className="tip-buttons">
        <button className="tip-button"><span>₹</span>50</button>
        <button className="tip-button"><span>₹</span>100</button>
        <button className="tip-button"><span>₹</span>150</button>
      </div>
      <div className="custom-buttons">
        <button className="custom-button">Custom</button>
        <button className="custom-button">%</button>
      </div>
      <button className="payment-btn" id="rzp-button1">Pay</button>
    </div>
  );
};

export default PaymentForm;
