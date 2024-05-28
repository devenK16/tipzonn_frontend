// src/pages/TermsConditions.js

import React from 'react'; // Import your logo file
import './TermsConditions.css'; // Import your CSS file for styling
import Footer4 from '../components/footer4';

function TermsConditions() {
  return (
    <div className="container">
      <div className="header">
        {/* Placeholder for Tipzonn logo */}
        <div className="logo">
          {/* You can add your logo here */}
          {/* <img src="logo.png" alt="Tipzonn Logo" /> */}
          <h1>Tipzonn</h1>
        </div>
        <h1>Terms & Conditions</h1>
      </div>
      <div className="content">
      <h2>Introduction</h2>
        <p>Welcome to Tipzonn! These Terms & Conditions ("Terms") govern your use of our mobile application (the "App"). By accessing or using the App, you agree to be bound by these Terms. If you do not agree with these Terms, please do not use the App.</p>

        <h2>Account Registration</h2>
        <p>To use certain features of the App, you must register for an account. You agree to:</p>
        <ul>
          <li>Provide accurate, current, and complete information during the registration process.</li>
          <li>Maintain and promptly update your account information.</li>
          <li>Maintain the security of your account credentials.</li>
          <li>Notify us immediately of any unauthorized use of your account.</li>
        </ul>

        <h2>User Responsibilities</h2>
        <p>As a user of the App, you agree to:</p>
        <ul>
          <li>Use the App only for lawful purposes.</li>
          <li>Not use the App in any way that could damage, disable, or impair the App.</li>
          <li>Not use the App to engage in any fraudulent or illegal activities.</li>
          <li>Comply with all applicable laws and regulations while using the App.</li>
        </ul>

        <h2>Payments and Transactions</h2>
        <p><strong>Payment Processing</strong><br/>All payments and tips made through the App are processed by our third-party payment processors. By making a payment or receiving a tip through the App, you agree to the terms and conditions of the payment processor.</p>
        <p><strong>Fees</strong><br/>We may charge fees for the use of certain features of the App. Any applicable fees will be disclosed to you before you incur them. You are responsible for paying all fees associated with your use of the App.</p>

        <h2>Intellectual Property</h2>
        <p><strong>Ownership</strong><br/>All content and materials available on the App, including but not limited to text, graphics, logos, and software, are the property of Tipzonn or its licensors and are protected by copyright, trademark, and other intellectual property laws.</p>
        <p><strong>License</strong><br/>Subject to these Terms, Tipzonn grants you a limited, non-exclusive, non-transferable, and revocable license to use the App for your personal, non-commercial use.</p>
        <p><strong>Restrictions</strong><br/>You agree not to:</p>
        <ul>
          <li>Reproduce, distribute, or create derivative works from the App or its content.</li>
          <li>Reverse engineer, decompile, or disassemble any part of the App.</li>
          <li>Remove or alter any copyright, trademark, or other proprietary notices on the App.</li>
        </ul>

        <h2>Disclaimers and Limitation of Liability</h2>
        <p><strong>Disclaimers</strong><br/>The App is provided on an "as-is" and "as-available" basis. Tipzonn makes no warranties, express or implied, regarding the App, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
        <p><strong>Limitation of Liability</strong><br/>To the fullest extent permitted by law, Tipzonn shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from:</p>
        <ul>
          <li>Your use of or inability to use the App.</li>
          <li>Any unauthorized access to or use of our servers and/or any personal information stored therein.</li>
          <li>Any interruption or cessation of transmission to or from the App.</li>
          <li>Any bugs, viruses, trojan horses, or the like that may be transmitted to or through the App by any third party.</li>
        </ul>

        <h2>Indemnification</h2>
        <p>You agree to indemnify, defend, and hold harmless Tipzonn, its officers, directors, employees, and agents, from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorney's fees, arising out of or in any way connected with:</p>
        <ul>
          <li>Your access to or use of the App.</li>
          <li>Your violation of these Terms.</li>
          <li>Your violation of any third-party rights, including intellectual property rights.</li>
        </ul>

        <h2>Governing Law and Dispute Resolution</h2>
        <p><strong>Governing Law</strong><br/>These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Tipzonn is based, without regard to its conflict of law principles.</p>
        <p><strong>Dispute Resolution</strong><br/>Any disputes arising out of or relating to these Terms or the App shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall be conducted in the jurisdiction in which Tipzonn is based, and the arbitrator's decision shall be enforceable in any court of competent jurisdiction.</p>

        <h2>Changes to These Terms</h2>
        <p>We may update these Terms from time to time. We will notify you of any changes by posting the new Terms on this page and updating the "Last Updated" date at the top of these Terms. Your continued use of the App after the posting of changes constitutes your acceptance of such changes.</p>

        <h2>Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us at:</p>
        <p>Email: <a href="mailto:tipzonn@gmail.com">tipzonn@gmail.com</a></p>
      </div>
      <div className="home-footer11">
            <Footer4></Footer4>
          </div>
    </div>
  );
}

export default TermsConditions;
