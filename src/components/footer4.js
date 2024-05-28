import React from 'react';
import PropTypes from 'prop-types';
import './footer4.css';

const Footer4 = (props) => {
  return (
    <div className="footer4-footer7 thq-section-padding">
      <div className="footer4-max-width thq-section-max-width">
        <div className="footer4-content">
          <div className="footer4-logo">
            <img
              alt={props.image1Alt}
              src={props.image1Src}
              className="footer4-logo1"
            />
          </div>
          <div className="footer4-links">
            <a href={props.aboutUsLink} className="thq-body-small">{props.link1}</a>
            <a href={props.contactUsLink} className="thq-body-small">{props.link2}</a>
            <a href={props.faqsLink} className="thq-body-small">{props.link3}</a>
            <a href={props.termsOfServiceLink} className="thq-body-small">{props.link4}</a>
            <a href={props.privacyLink} className="thq-body-small">{props.link5}</a>
          </div>
        </div>
        <div className="footer4-credits">
          <div className="thq-divider-horizontal"></div>
          <div className="footer4-row">
            <div className="footer4-container">
              <span className="thq-body-small">© 2024 Tipzonn. All right reserved.</span>
            </div>
            <div className="footer4-footer-links">
              <a href={props.privacyLink} className="footer4-text6 thq-body-small">Privacy Policy</a>
              <a href={props.termsLink} className="thq-body-small">Terms of Use</a>
              <a href={props.refundLink} className="thq-body-small">Refund/Cancellation</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Footer4.defaultProps = {
  link1: 'About Us',
  aboutUsLink: 'https://www.tipzonn.com/about',
  link2: 'Contact Us',
  contactUsLink: 'https://www.tipzonn.com/contact',
  link3: 'FAQs',
  faqsLink: 'https://www.tipzonn.com/faqs',
  link4: 'Terms of Service',
  termsOfServiceLink: 'https://www.tipzonn.com/terms',
  link5: 'Privacy Policy',
  privacyLink: 'https://www.tipzonn.com/privacy',
  termsLink: 'https://www.tipzonn.com/terms',
  refundLink: 'https://www.tipzonn.com/refund',
  image1Src: 'https://images.unsplash.com/photo-1572016047668-5b5e909e1605?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcxNjgzMzMwMnw&ixlib=rb-4.0.3&q=80&w=1080',
  image1Alt: 'Tipzonn Logo',
};

Footer4.propTypes = {
  link1: PropTypes.string,
  aboutUsLink: PropTypes.string,
  link2: PropTypes.string,
  contactUsLink: PropTypes.string,
  link3: PropTypes.string,
  faqsLink: PropTypes.string,
  link4: PropTypes.string,
  termsOfServiceLink: PropTypes.string,
  link5: PropTypes.string,
  privacyLink: PropTypes.string,
  termsLink: PropTypes.string,
  refundLink: PropTypes.string,
  image1Src: PropTypes.string,
  image1Alt: PropTypes.string,
};

export default Footer4;
