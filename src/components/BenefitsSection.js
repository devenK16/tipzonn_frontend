import React, { useState } from 'react';
import './BenefitsSection.css';
import { HeroHighlight, Highlight } from '../components/ui/hero-highlight'; // Adjust the import path as necessary

const benefitsData = {
  customer: {
    heading: "Simple for your <span class='highlight'>customers</span>",
    description: "Your customers can send cashless tips directly to your staff members. Customers simply scan the QR code given to your business, select the staff they want to tip, leave a review and pay. There is no app required and the process takes just 3 seconds to complete.",
    items: [
      "No app required",
      "No registration",
      "Secure transactions",
      "Conveniently use any payment app",
    ],
    image: "/tipzonn_customer_rbg.png", // replace with your image path
  },
  employee: {
    heading: "Simple for <span class='highlight'>employees</span>",
    description: "Tips are delivered directly to staff with instant notification on their mobile. They can track, in real-time, all tip transactions via their own personal dashboard.",
    items: [
      "Increased Tips",
      "Instant notifications",
      "Personal dashboard",
      "Quick payouts",
    ],
    image: "/tipzonn_waiter_rbg.png", // replace with your image path
  },
  manager: {
    heading: "Simple for <span class='highlight'>Manager & Owner</span>",
    description: "Whether you want to collect individual or common tips, Tipzonn has you covered. You can be set up for any collection or distribution types and can take care of regulatory requirements no matter if your staff are self-employed, employed or a mix of both. Tipzonn's cashless tipping platform helps you build a consistent and transparent tipping system your staff will love.",
    items: [
      "Increase in reviews and ratings",
      "Happier staff",
      "Improved customer experience",
      "Simplified tip management",
    ],
    image: "/tipzonn_manager_rbg.png", // replace with your image path
  },
};

const BenefitsSection = () => {
  const [selectedRole, setSelectedRole] = useState('customer');

  const { heading, description, items, image } = benefitsData[selectedRole];

  return (
    <div className="benefits-section">
      <h2 className="benefits-heading">
      Benefits For Businesses, Employees, and Customers with <Highlight>Tipzonn Cashless Tipping</Highlight>
        </h2>
      <div className="buttons">
        <button onClick={() => setSelectedRole('customer')} className="px-8 py-2 rounded-full bg-gradient-to-b bg-custom-color to-bg-custom-color text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
          Customer
        </button>
        <button onClick={() => setSelectedRole('employee')} className="px-8 py-2 rounded-full bg-gradient-to-b bg-custom-color to-bg-custom-color text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
          Employee
        </button>
        <button onClick={() => setSelectedRole('manager')} className="px-8 py-2 rounded-full bg-gradient-to-b bg-custom-color to-bg-custom-color text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
          Manager/Owner
        </button>
      </div>
      <div className={`benefits-content ${selectedRole}`}>
        <img className="image-transition" src={image} alt={`${selectedRole} benefits`} />
        <div className="text-content">
          <h3 className="benefits-subheading" dangerouslySetInnerHTML={{ __html: heading }}></h3>
          <p className="benefits-description">{description}</p>
          <ul className="benefits-list">
            {items.map((item, index) => (
              <li key={index} className="benefits-item"><span className="checkmark">✓</span> {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
