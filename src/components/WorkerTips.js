import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function WorkerTips() {
  const { workerId } = useParams();
  const [worker, setWorker] = useState(null);
  const [tips, setTips] = useState([]);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const workerResponse = await axios.get(`https://backend.tipzonn.com/api/workers/worker/${workerId}`);
        const tipsResponse = await axios.get(`https://backend.tipzonn.com/api/tips/${workerId}`);

        console.log('Worker Response:', workerResponse.data);
        console.log('Tips Response:', tipsResponse.data);

        setWorker(workerResponse.data);

        const tipsData = tipsResponse.data.length ? tipsResponse.data[0].tips : [];
        setTips(tipsData.sort((a, b) => new Date(b.date) - new Date(a.date)));
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
    <div>
      <h1>{worker.name}</h1>
      <h2>Tips</h2>
      <ul>
        {tips.map(tip => (
          <li key={tip._id}>
            <div>Date: {new Date(tip.date).toLocaleDateString()}</div>
            <div>Amount: ${tip.amount.toFixed(2)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkerTips;
