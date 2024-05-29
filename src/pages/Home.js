// Home.js
import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import WorkerGrid from '../components/WorkerGrid'; // Assuming this is in your project
import { Helmet } from 'react-helmet';
import Navbar2 from '../components/navbar2';
import Hero12 from '../components/hero12';
import Features171 from '../components/features171';
import Features18 from '../components/features18';
import Features17 from '../components/features17';
import CTA1 from '../components/cta1';
import FAQ1 from '../components/faq1';
import Contact4 from '../components/contact4';
import Footer4 from '../components/footer4';
import './home.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const query = useQuery();
  const tzId = query.get('tzId');

  const homeRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);
  const contactRef = useRef(null);

  const handleLinkClick = (link) => {
    switch (link) {
      case 'Home':
        if (homeRef.current) {
          homeRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case 'For Businesses':
        if (featuresRef.current) {
          featuresRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case 'How It Works':
        if (ctaRef.current) {
          ctaRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case 'Contact Us':
        if (contactRef.current) {
          contactRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="home-container">
      {tzId ? (
        <WorkerGrid tzId={tzId} />
      ) : (
        <>
          <Helmet>
            <title>Tizponn</title>
            <meta property="og:title" content="Tizponn" />
          </Helmet>
          <div className="home-navbar1">
            <Navbar2 rootClassName="navbar2-root-class-name" onLinkClick={handleLinkClick}></Navbar2>
          </div>
          <div className="home-hero2">
            <Hero12 heading1="India's Leading Tipping Platform"></Hero12>
          </div>
          <div className="home-features5" ref={featuresRef}>
            <Features171
              feature1Title="Simple for your customers"
              feature1Description="Your guests can send cashless tips directly to your staff members. Guests simply scan the QR code on your merchandise or receipt, select the recipient(s) they want to tip, leave a review and pay. There is no app required and the process takes just 3 seconds to complete."
            ></Features171>
          </div>
          <div className="home-features6">
            <Features18
              feature1Title="Simple for employees"
              feature1Description="Tips are delivered directly to staff with instant notifications on their mobile. They can track, in real-time, all cashless tip transactions via their own personal dashboard."
            ></Features18>
          </div>
          <div className="home-features7">
            <Features17
              feature1Title="Simple for Managers & Owners"
              feature1Description="Whether you want to collect individual or common tips, Tipzonn  has you covered. You can be set up for any collection or distribution types and can take care of regulatory requirements no matter if your staff are self-employed, employed or a mix of both. Tipzonn's cashless tipping platform helps you build a consistent and transparent tipping system your staff will love."
            ></Features17>
          </div>
          <div className="home-cta8" ref={ctaRef}>
            <CTA1
              action1="Contact Us"
              content1="Tipzonn's innovative digital tipping platform supports hospitality and services business owners, staff and customers by providing a seamless cashless tipping experience. "
            ></CTA1>
          </div>
          <div className="home-faq9">
            <FAQ1 action1="Contact Us"></FAQ1>
          </div>
          <div className="home-contact10" ref={contactRef}>
            <Contact4
              email1="contact@tipzonn.com"
              content2="For any inquiries or support, please email us at the address below"
              content3="Contact us through Email"
              content4="Call us on below number for more details"
            ></Contact4>
          </div>
          <div className="home-footer11">
            <Footer4></Footer4>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
