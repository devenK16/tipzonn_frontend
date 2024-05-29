import React, { useEffect, useCallback } from 'react';
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
  const [amount, setAmount] = React.useState(100);
  const navigate = useNavigate();

  const processPayment = useCallback(async () => {
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
        callback_url: 'https://www.tipzonn.com/ratingsTest.html',
        prefill: {
          name: 'Customer Name',
          email: 'customer.email@example.com',
          contact: '9000090000'
        },
        notes: {
          address: 'Razorpay Corporate Office'
        },
        theme: {
          color: '#00FFFF'
        }
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

  return (
    <div className="container-paymentForm">
      <div className="header-paymentForm">
        <h2>Tipping <span id="workerName">{workerName}</span></h2>
      </div>
      <div className="input-container">
        <span className="rupee-symbol">₹</span>
        <input
          type="number"
          id="paymentAmount"
          className="payment-input"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
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
          <button key={number} onClick={() => setAmount(amount + number.toString())}>{number}</button>
        ))}
        <button onClick={() => setAmount('0')}>C</button>
<button onClick={() => setAmount(String(amount).slice(0, -1))}>←</button>
      </div>
      <button className="payment-btn" id="rzp-button1">Pay</button>
    </div>
  );
};

export default PaymentForm;
