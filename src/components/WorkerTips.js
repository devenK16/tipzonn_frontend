import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './WorkerTips.css';

function WorkerTips() {
  const { workerId } = useParams();
  const [worker, setWorker] = useState(null);
  const [tips, setTips] = useState([]);
  const [totalTip, setTotalTip] = useState(0);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const workerResponse = await axios.get(`https://backend.tipzonn.com/api/workers/worker/${workerId}`);
        const tipsResponse = await axios.get(`https://backend.tipzonn.com/api/tips/${workerId}`);

        console.log('Worker Response:', workerResponse.data);
        console.log('Tips Response:', tipsResponse.data);

        setWorker(workerResponse.data);

        if (tipsResponse.data.length) {
          const tipsData = tipsResponse.data[0].tips;
          setTips(tipsData.sort((a, b) => new Date(b.date) - new Date(a.date)));
          setTotalTip(tipsResponse.data[0].totalTip);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchTips();
  }, [workerId]);

  if (!worker) {
    return <div>Loading...</div>;
  }

  return (
    <div className="worker-tips-container">
      <div className="header">
        <div className="welcome-message">
          <h1>Welcome,</h1>
          <h2>{worker.name}</h2>
        </div>
        <div className="total-tips-card">
          <h2>Total Tips</h2>
          <p>₹{totalTip.toFixed(2)}</p>
        </div>
      </div>
      <div className="tips-list">
        <h2>Tips Received :</h2>
        <div className="tips-container">
          {tips.map(tip => {
            const date = new Date(tip.date);
            const formattedDate = date.toLocaleDateString();
            const formattedTime = date.toLocaleTimeString();

            return (
              <div key={tip._id} className="tip-item">
                <div>You have received a tip of ₹{tip.amount.toFixed(2)} on {formattedDate} at {formattedTime}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default WorkerTips;
