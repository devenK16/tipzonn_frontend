import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Meteors } from './ui/meteors';
import './WorkerTips.css';
import { requestFirebaseNotificationPermission, onMessageListener } from '../firebase';

function WorkerTips() {
  const { workerId } = useParams();
  const [worker, setWorker] = useState(null);
  const [tips, setTips] = useState([]);
  const [totalTip, setTotalTip] = useState(0);
  const [notification, setNotification] = useState({ title: '', body: '' });

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const workerResponse = await axios.get(`https://backend.tipzonn.com/api/workers/worker/${workerId}`);
        const tipsResponse = await axios.get(`https://backend.tipzonn.com/api/tips/${workerId}`);

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

  useEffect(() => {
    requestFirebaseNotificationPermission().then((token) => {
      if (token) {
        axios.post(`https://backend.tipzonn.com/api/workers/worker/${workerId}/token`, { token })
          .catch(err => console.error('Error saving FCM token:', err));
      }
    });

    onMessageListener()
      .then(payload => {
        setNotification({ title: payload.notification.title, body: payload.notification.body });
        console.log('Notification received:', payload);
      })
      .catch(err => console.log('failed: ', err));
  }, [workerId]);

  if (!worker) {
    return <div>Loading...</div>;
  }

  return (
    <div className="worker-tips-container">
      {notification.title && (
        <div className="notification-popup">
          <h2>{notification.title}</h2>
          <p>{notification.body}</p>
        </div>
      )}
      <div className="header">
        <div className="welcome-message">
          <h1>Welcome,</h1>
          <h2>{worker.name}</h2>
        </div>
        <div className="total-tips-card shadow-xl bg-gradient-to-r from-[#5ce4e4] to-[#00bfff] border border-gray-800">
          <div className="meteor-container">
            <Meteors number={20} />
          </div>
          <h2 className="relative z-10">Total Tips</h2>
          <p className="relative z-10">₹{totalTip.toFixed(2)}</p>
        </div>
      </div>
      <div className="tips-list">
        <h2>Tips Received :</h2>
        <div className="tips-container ">
          {tips.map(tip => {
            const date = new Date(tip.date);
            const formattedDate = date.toLocaleDateString();
            const formattedTime = date.toLocaleTimeString();

            return (
              <div key={tip._id} className="tip-item bg-gradient-to-r from-[#5ce4e4] to-[#00bfff]">
                <div>You have received a tip of ₹<b>{tip.amount.toFixed(2)}</b> on {formattedDate} at {formattedTime}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default WorkerTips;
