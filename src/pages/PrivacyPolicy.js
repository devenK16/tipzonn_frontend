// src/pages/PrivacyPolicy.js

import React from 'react';
import './TermsConditions.css';
import Footer4 from '../components/footer4'; // Import the same CSS file used for Terms & Conditions

function PrivacyPolicy() {
  return (
    <div className="container">
      <div className="header">
        <div className="logo">
         <h1>Tipzonn</h1> 
        </div>
        <h1>Privacy Policy</h1>
      </div>
      <div className="content">
        <p><strong>Introduction</strong><br/>
        Welcome to Tipzonn! At Tipzonn, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application (the "App"). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not use the App.</p>

        <p><strong>Information We Collect</strong></p>
        <p><strong>Personal Information</strong><br/>
        We may collect the following personal information from you:</p>
        <ul>
          <li>Contact Information: Name, email address, and phone number.</li>
          <li>Account Information: Username, password, and profile picture.</li>
          <li>Payment Information: Bank account details, credit card information, and transaction history.</li>
          <li>Location Information: GPS location to match customers with nearby waiters.</li>
          <li>Usage Data: Information about how you use the App, including access times, device information, and browsing history.</li>
        </ul>

        <p><strong>Non-Personal Information</strong><br/>
        We may collect non-personal information such as:</p>
        <ul>
          <li>Device Information: Information about the device you use to access the App, including hardware model, operating system, and device identifiers.</li>
          <li>Log Data: Details of your use of the App, including traffic data, location data, and communication data.</li>
        </ul>

        <p><strong>How We Use Your Information</strong><br/>
        We use the information we collect in the following ways:</p>
        <ul>
          <li>To Provide Services: Facilitate the online tipping process between customers and waiters.</li>
          <li>To Improve Our App: Understand and analyze how you use the App to improve its functionality and user experience.</li>
          <li>To Communicate with You: Send you updates, notifications, and other information regarding the App.</li>
          <li>To Process Transactions: Process your payments and tips securely.</li>
          <li>To Ensure Security: Monitor and analyze usage and trends to ensure the security and integrity of the App.</li>
        </ul>

        <p><strong>Sharing Your Information</strong><br/>
        We do not sell, trade, or rent your personal information to others. We may share your information in the following situations:</p>
        <ul>
          <li>With Service Providers: We may share your information with third-party service providers who perform services on our behalf, such as payment processing and customer support.</li>
          <li>Legal Requirements: We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).</li>
          <li>Business Transfers: If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</li>
        </ul>

        <p><strong>Security of Your Information</strong><br/>
        We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that no security measures are perfect or impenetrable and no method of data transmission can be guaranteed against any interception or other types of misuse.</p>

        <p><strong>Your Privacy Rights</strong><br/>
        Depending on your location, you may have the following rights regarding your personal information:</p>
        <ul>
          <li>Access: You may request access to the personal information we have about you.</li>
          <li>Correction: You may request that we correct or update any inaccurate personal information.</li>
          <li>Deletion: You may request that we delete your personal information, subject to certain exceptions.</li>
          <li>Objection: You may object to the processing of your personal information.</li>
        </ul>
        <p>To exercise these rights, please contact us using the contact information provided below.</p>

        <p><strong>Changes to This Privacy Policy</strong><br/>
        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes. Your continued use of the App after the posting of changes constitutes your acceptance of such changes.</p>

        <p><strong>Contact Us</strong><br/>
        If you have any questions about this Privacy Policy, please contact us at:</p>
        <p>Email: <a href="mailto:contact@tipzonn.com">contact@tipzonn.com</a></p>
      </div>
      <div className="home-footer11">
            <Footer4></Footer4>
          </div>
    </div>
  );
}

export default PrivacyPolicy;
