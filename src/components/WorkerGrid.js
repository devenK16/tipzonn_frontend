import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './workergrid.css'; // Ensure this CSS file is in the same directory

const WorkerGrid = ({ tzId }) => {
  const [workers, setWorkers] = useState([]);
  const [restaurantName, setRestaurantName] = useState('');
  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await fetch(`https://backend.tipzonn.com/api/workers/${tzId}`);
        const workersData = await response.json();
        setWorkers(workersData);
      } catch (error) {
        console.error('Error fetching workers:', error);
      }
    };

    const fetchRestaurantName = async () => {
      try {
        const response = await fetch(`https://backend.tipzonn.com/api/users/${tzId}`);
        const user = await response.json();
        setRestaurantName(user.name);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchWorkers();
    fetchRestaurantName();
  }, [tzId]);

  const showPaymentForm = (workerName, workerId , workerPhoto) => {
    navigate(`/payment?worker=${encodeURIComponent(workerName)}&workerId=${encodeURIComponent(workerId)}&tzId=${encodeURIComponent(tzId)}&workerPhoto=${encodeURIComponent(workerPhoto)}`);
  };

  const showTipAllForm = () => { 
    const allWorkerIds = workers.map(worker => worker._id).join(','); 
    navigate(`/payment?worker=All Workers&workerId=${encodeURIComponent(allWorkerIds)}&tzId=${encodeURIComponent(tzId)}`); 
  };

  return (
    <div>
      <div className="logo-container-main">
        <img src="Tipzonnlogo-payment.png" alt="Tipzonn Logo" className="tipzonn-logo-main" />
      </div>

    <div className="restaurant-container">
      {restaurantName}
    </div>

    <div className="selectWorker-container">
      Select Worker
    </div>
      <div className="worker-grid">
        {workers.map((worker) => (
          <div key={worker._id} className="worker-card" onClick={() => showPaymentForm(worker.name, worker._id , worker.photo)}>
            <div className="worker-image-wrapper">
              <img src={worker.photo || getRandomAvatar() } alt={worker.name} className="worker-image" />
              <div className="worker-name-overlay">
                <div className="worker-name">{worker.name}</div>
              </div>
            </div>
          </div>
        ))}
        <div className="worker-card tip-all-card" onClick={showTipAllForm}> 
          <div className="tip-all"> 
            TIP ALL 
          </div> 
        </div> 
      </div>
    </div>
  );
};

export default WorkerGrid;
