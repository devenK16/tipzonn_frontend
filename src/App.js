import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Payment from './pages/Payment';
import Ratings from './pages/Ratings';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import Refunds from './pages/Refund';
import WorkerTips from './components/WorkerTips';
import './App.css';
import './style.css'
import './style_1.css'; // Import your styles

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/ratings" element={<Ratings />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/refund" element={<Refunds />} />
        <Route path="/tips/:workerId" element={<WorkerTips />} />
      </Routes>
    </Router>
  );
}

export default App;