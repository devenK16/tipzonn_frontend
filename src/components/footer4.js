import React from 'react';
import PropTypes from 'prop-types';
import './footer4.css';

const Footer4 = (props) => {
  return (
    <div className="footer151-container">
      <div className="footer151-max-width thq-section-max-width">
          <div className="footer151-actions">
            <div className="footer151-container1">
              <img
                alt={props.logoAlt}
                src={props.logoSrc}
                className="footer151-image1"
              />
            </div>
          </div>
        <div className="footer151-credits">
          <div className="footer151-row">
            <div className="footer151-credits1">
              <a href={props.privacyLink} className="thq-body-small">Privacy Policy</a>
              <a href={props.termsLink} className="thq-body-small">Terms of Use</a>
              <a href={props.cookiesLink} className="thq-body-small">Refunds/Cancellations</a>
            </div>
          </div>
          <span className="footer151-content3 thq-body-small">
            {props.copyright}
          </span>
        </div>
      </div>
    </div>
  );
}

Footer4.defaultProps = {
  cookiesLink: 'https://www.tipzonn.com/refund',
  copyright: '© 2024 Tipzonn. All rights reserved.',
  privacyLink: 'https://www.tipzonn.com/privacy',
  termsLink: 'https://www.tipzonn.com/terms',
  logoSrc: '/Tipzonn-logo.png',
  logoAlt: 'Tipzonn Logo',
}

Footer4.propTypes = {
  cookiesLink: PropTypes.string,
  copyright: PropTypes.string,
  privacyLink: PropTypes.string,
  termsLink: PropTypes.string,
  logoSrc: PropTypes.string,
  logoAlt: PropTypes.string,
}

export default Footer4;
