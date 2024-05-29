import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './workergrid.css'; // Ensure this CSS file is in the same directory

const WorkerGrid = ({ tzId }) => {
  const [workers, setWorkers] = useState([]);
  const [restaurantName, setRestaurantName] = useState('');
  const navigate = useNavigate();

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

  const showPaymentForm = (workerName, workerId) => {
    navigate(`/payment?worker=${encodeURIComponent(workerName)}&workerId=${encodeURIComponent(workerId)}&tzId=${encodeURIComponent(tzId)}`);
  };

  return (
    <div>
      <h1>{restaurantName}</h1>
      <div className="worker-grid">
        {workers.map((worker) => (
          <div key={worker.id} className="worker-card" onClick={() => showPaymentForm(worker.name, worker.id)}>
            <div className="worker-image-wrapper">
              <img src={worker.photo} alt={worker.name} className="worker-image" />
              <div className="worker-name-overlay">
                <div className="worker-name">{worker.name}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkerGrid;
