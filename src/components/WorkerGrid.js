// WorkerGrid.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WorkerGrid = ({ tzId }) => {
  const [workers, setWorkers] = useState([]);
  const [restaurantName, setRestaurantName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await fetch(`https://backend-staging.tipzonn.com/api/workers/${tzId}`);
        const workersData = await response.json();
        setWorkers(workersData);
      } catch (error) {
        console.error('Error fetching workers:', error);
      }
    };

    const fetchRestaurantName = async () => {
      try {
        const response = await fetch(`https://backend-staging.tipzonn.com/api/users/${tzId}`);
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
    <div className="container">
      <h1 className="heading">{restaurantName}</h1>
      <h2 className="sub-heading">Select Worker</h2>
      <div className="grid">
        {workers.map(worker => (
          <div key={worker._id} className="card" onClick={() => showPaymentForm(worker.name, worker._id)}>
            <img src={worker.photo} alt={`Worker ${worker.name}`} />
            <p>{worker.name}</p>
            <p>{worker.profession}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkerGrid;
