import React, { useEffect, useCallback, useState , useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Divider } from "@nextui-org/react";
import { Drawer } from 'vaul';
import CurrencyInput from '../components/ui/CurrencyInput';
import './payment.css';

const avatarImages = [
  '/avt1.png',
  '/avt2.png',
  '/avt3.png',
  '/avt4.png',
];

const getRandomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * avatarImages.length);
  return avatarImages[randomIndex];
};

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
  const [amount, setAmount] = useState(50);
  const currency = '₹';
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();
  const [billAmount, setBillAmount] = useState(0);
  const [tipPercentage, setTipPercentage] = useState(0);
  const [calculatedTip, setCalculatedTip] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [workerPhoto, setWorkerPhoto] = useState('');
  const workerPhotoParam = new URLSearchParams(window.location.search).get('workerPhoto');
  const [showInfoCard, setShowInfoCard] = useState(false);
  const infoCardRef = useRef(null);
  const [isCheckedFee, setIsCheckedFee] = useState(false);

  useEffect(() => {
    setWorkerPhoto(workerPhotoParam || getRandomAvatar());
  }, [workerPhotoParam]);

  const percentages = [
    { icon: '🙂', value: 10 },
    { icon: '😁', value: 15 },
    { icon: '😍', value: 20 },
    { icon: '🫶', value: 25 }
  ];

  const handleBillAmountChange = (value) => {
    setBillAmount(value);
    calculateTip(value, tipPercentage);
  };

  const handleTipPercentageChange = (value) => {
    setTipPercentage(value);
    calculateTip(billAmount, value);
  };

  const calculateTip = (bill, percentage) => {
    const tip = (bill * percentage) / 100;
    setCalculatedTip(Number(tip.toFixed(2)));
    handleAmountChange(tip); // Update the main amount state
  };

  const handleButtonClick = (value) => {
    setAmount(value);
    setSelectedAmount(value);
  };

  const handleAmountChange = (value) => {
    setAmount(value);
    if ([50, 100, 150].includes(value)) {
      setSelectedAmount(value);
    } else {
      setSelectedAmount(null);
    }
  };

  const processPayment = useCallback(async () => {
    let finalAmount = amount;
    if (isCheckedFee) {
      finalAmount = amount * 1.05; // Adding 5% to the amount
    }
    
    finalAmount = (finalAmount.toFixed(2));
    const finalAmountNumber = parseFloat(finalAmount);
   
    if (finalAmountNumber <= 0) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000); // Auto-hide after 3 seconds
      return;
    }

    const orderData = {
      amount: finalAmountNumber,
      currency: 'INR',
      receipt: `receipt_${new Date().getTime()}`,
      notes: { workerName, workerIds, userId , isCheckedFee  }
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
        amount: finalAmountNumber * 100,
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
                body: JSON.stringify({ workerIds, amount: finalAmountNumber })
              });
            } else {
              await fetch(`https://backend.tipzonn.com/api/tips/${workerId}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount: finalAmountNumber })
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
  }, [amount, workerName, workerIds, userId , isCheckedFee]);

  useEffect(() => {
    loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js').then((loaded) => {
      if (!loaded) {
        console.error('Razorpay SDK failed to load');
        return;
      }
      document.getElementById('rzp-button1').onclick = processPayment;
    });
  }, [processPayment]);

  const handlePercentageConfirm = useCallback(async () => {
    if (calculatedTip <= 0) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      return;
    }

    // Close the drawer
    // You might need to implement a way to control the drawer's open state
    // For example, you could add a state variable like `isPercentageDrawerOpen`
    // setIsPercentageDrawerOpen(false);

    // Process the payment
    await processPayment();
  }, [calculatedTip, processPayment]);

  const handleInfoIconClick = () => {
    setShowInfoCard(!showInfoCard);
  };

  const handleClickOutside = (event) => {
    if (infoCardRef.current && !infoCardRef.current.contains(event.target)) {
      setShowInfoCard(false);
    }
  };
  
  useEffect(() => {
    if (showInfoCard) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showInfoCard]);


  return (
    
    <div className="container-paymentForm">
      <div className="logo-container-main">
        <img src="Tipzonnlogo-payment.png" alt="Tipzonn Logo" className="tipzonn-logo-main" />
      </div>
      {/* Notification pop-up */}
      {showNotification && (
        <div className={`notification ${showNotification ? 'show' : ''}`}>
          Tipping Amount must be greater than 0
          <button className="close-btn" onClick={() => setShowNotification(false)}>×</button>
        </div>
      )}

      <div className="header-paymentForm">
         <div className="worker-photo-container-payment">
            {workerPhoto && (
              <div className="worker-image-wrapper-payment">
                <img src={workerPhoto} alt="Worker" className="worker-image-payment" />
              </div>
            )}
          </div>
          <div className="header-text">
            Tipping <span id="workerName">{workerName}</span>
          </div>
      </div>
      {/* <div className="input-container">
        <span className="rupee-symbol">₹</span>
        <input
          type="number"
          id="paymentAmount"
          className="payment-input"
          value={amount}
          onChange={(e) => handleAmountChange(Number(e.target.value))}
          placeholder="100"
        />
      </div> */}

      <Divider className="my-4 mb-8" />

      <div className="tip-buttons">
      <button
          className={`tip-button ${selectedAmount === 50 ? 'selected' : ''}`}
          onClick={() => handleButtonClick(50)}
        >
          <span>₹</span>50
        </button>
        <button
          className={`tip-button ${selectedAmount === 100 ? 'selected' : ''}`}
          onClick={() => handleButtonClick(100)}
        >
          <span>₹</span>100
        </button>
        <button
          className={`tip-button ${selectedAmount === 150 ? 'selected' : ''}`}
          onClick={() => handleButtonClick(150)}
        >
          <span>₹</span>150
        </button>
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
                    onChange={(value) => handleAmountChange(Number(value))}
                    currency={currency}
                  />
                </div>
              </div>
              <div className="p-4 bg-white mt-auto">
                <div className="flex gap-6 justify-end max-w-md mx-auto mb-6 mt-3">
                  <button className="payment-btn" onClick={processPayment}>Confirm {currency}{amount.toFixed(2)}</button>
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>

        <Drawer.Root>
          <Drawer.Trigger asChild>
            <button className="custom-button">%</button>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40" />
            <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0">
              <div className="p-4 bg-white rounded-t-[10px] flex-1">
                <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
                <div className="max-w-md mx-auto text-center">
                  <Drawer.Title className="font-semibold lg:text-xl text-lg font-normal mb-6 text-center">
                    Calculate Tip
                  </Drawer.Title>
                  
                  <div className="mb-10">
                    <label className="block text-black font-medium lg:text-xl text-lg">
                      Enter Bill Amount
                    </label>
                    <CurrencyInput
                      value={billAmount}
                      onChange={(value) => handleBillAmountChange(Number(value))}
                      currency={currency}
                    />
                  </div>

                  <div className="mb-10">
                    <label className="block text-black font-medium lg:text-xl text-lg mb-2">
                      Quality of service
                    </label>
                    <div className="emoji-buttons ">
                      {percentages.map((data, index) => (
                        <button
                          key={index}
                          onClick={() => handleTipPercentageChange(data.value)}
                          className={`emoji-button ${tipPercentage === data.value ? 'active' : ''}`}
                        >
                          <span className="emoji">{data.icon}</span>
                          <span className="percentage">{data.value}%</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="block text-black font-medium lg:text-xl text-lg mb-1">
                      Calculated Tip
                    </label>
                    <div className="p-2 bg-gray-100 rounded">
                      {currency}{calculatedTip.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white mt-auto">
                <div className="flex gap-6 justify-end max-w-md mx-auto mb-10">
                  <button 
                    className="payment-btn" 
                    onClick={handlePercentageConfirm}
                  >
                    Confirm {currency}{amount.toFixed(2)}
                  </button>
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <input 
              type="checkbox" 
              id="fee" 
              name="transactions" 
              className="mr-2" 
              onChange={(e) => setIsCheckedFee(e.target.checked)}
            />
          <label htmlFor="fee" className="text-gray-700">Pay transaction costs 🩵</label>
        </div>
        <div className="flex justify-center items-center relative">
          <div 
            id="trigger" 
            className="text-gray-400 border border-gray-500 h-4 w-4 rounded-full text-center text-xs cursor-pointer" 
            onClick={handleInfoIconClick}
          >
            i
          </div>
          {showInfoCard && (
            <>
              <div className="overlay" onClick={() => setShowInfoCard(false)}></div>
              <div ref={infoCardRef} className="info-card">
                This way the staff will receive the full amount of tip
              </div>
            </>
          )}
        </div>
      </div>
      <button className="payment-btn" id="rzp-button1">Confirm {currency}{amount.toFixed(2)}</button>
    </div>
  );
};

export default PaymentForm;
