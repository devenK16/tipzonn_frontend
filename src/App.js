import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Payment from './pages/Payment';
import Ratings from './pages/Ratings';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import Refunds from './pages/Refund';
import './App.css';
import './style.css'

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
      </Routes>
    </Router>
  );
}

export default App;