import React, { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Divider } from "@nextui-org/react";
import { Drawer } from 'vaul';
import CurrencyInput from '../components/ui/CurrencyInput';
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
  const currency = '₹';
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
        handler: async (response) => {
          console.log('Payment successful:', response);

          // Send POST request to update tip information
          try {
            if (workerIds.length > 1) {
              await fetch(`https://backend.tipzonn.com/api/tips/multiple`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ workerIds, amount })
              });
            } else {
              await fetch(`https://backend.tipzonn.com/api/tips/${workerId}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount })
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

  const handleAmountChange = (value) => {
    setAmount(value);
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
          onChange={(e) => setAmount(Number(e.target.value))}
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
        <Drawer.Root>
          <Drawer.Trigger asChild>
            <button className="custom-button">Custom</button>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40" />
            <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0">
              <div className="p-4 bg-white rounded-t-[10px] flex-1">
                <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
                <div className="max-w-md mx-auto text-center">
                  <Drawer.Title className="font-medium mb-6">
                    Enter Tip Amount
                  </Drawer.Title>
                  <CurrencyInput
                    value={amount}
                    onChange={(value) => setAmount(Number(value))}
                    currency={currency}
                  />
                </div>
              </div>
              <div className="p-4 bg-white mt-auto">
                <div className="flex gap-6 justify-end max-w-md mx-auto mb-6 mt-3">
                  <button className="payment-btn" onClick={processPayment}>Confirm</button>
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
        <button className="custom-button">%</button>
      </div>
      <button className="payment-btn" id="rzp-button1">Confirm</button>
    </div>
  );
};

export default PaymentForm;
