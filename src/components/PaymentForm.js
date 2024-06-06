import React, { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './payment.css';  // Import the payment CSS

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
      notes: { workerName, workerId, userId }
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
            await fetch(`https://backend.tipzonn.com/api/tips/${workerId}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ amount })
            });
            // Redirect to ratings page
            window.location.href = `https://www.tipzonn.com/ratings?tzId=${userId}`;
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
  }, [amount, workerName, workerId, userId]);

  useEffect(() => {
    loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js').then((loaded) => {
      if (!loaded) {
        console.error('Razorpay SDK failed to load');
        return;
      }
      document.getElementById('rzp-button1').onclick = processPayment;
    });
  }, [processPayment]);

  const handleKeypadInput = (number) => { //new comment1
    setAmount((prevAmount) => { //new comment1
      const newAmount = Number(prevAmount.toString() + number.toString()); //new comment1
      return newAmount; //new comment1
    }); //new comment1
  }; //new comment1

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
      <div className="tip-buttons">
        <button className="tip-button" onClick={() => setAmount(50)}>50</button>
        <button className="tip-button" onClick={() => setAmount(100)}>100</button>
        <button className="tip-button" onClick={() => setAmount(150)}>150</button>
      </div>
      <div className="keypad">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(number => (
          <button key={number} onClick={() => handleKeypadInput(number)}>{number}</button> //new comment1
        ))}
        <button onClick={() => setAmount(0)}>C</button>
        <button onClick={() => setAmount(Number(String(amount).slice(0, -1)))}>←</button> 
      </div>
      <button className="payment-btn" id="rzp-button1">Pay</button>
    </div>
  );
};

export default PaymentForm;
