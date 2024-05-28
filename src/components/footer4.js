import React from 'react'

import PropTypes from 'prop-types'

import './footer4.css'

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
            <span className="thq-body-small">{props.link1}</span>
            <span className="thq-body-small">{props.link2}</span>
            <span className="thq-body-small">{props.link3}</span>
            <span className="thq-body-small">{props.link4}</span>
            <span className="thq-body-small">{props.link5}</span>
          </div>
        </div>
        <div className="footer4-credits">
          <div className="thq-divider-horizontal"></div>
          <div className="footer4-row">
            <div className="footer4-container">
              <span className="thq-body-small">© 2024 TeleportHQ</span>
            </div>
            <div className="footer4-footer-links">
              <span className="footer4-text6 thq-body-small">
                {props.privacyLink}
              </span>
              <span className="thq-body-small">{props.termsLink}</span>
              <span className="thq-body-small">{props.cookiesLink}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Footer4.defaultProps = {
  link2: 'Contact Us',
  privacyLink: 'https://www.tipzonn.com/privacy',
  link3: 'FAQs',
  image1Src:
    'https://images.unsplash.com/photo-1572016047668-5b5e909e1605?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcxNjgzMzMwMnw&ixlib=rb-4.0.3&q=80&w=1080',
  termsLink: 'https://www.tipzonn.com/terms',
  link5: 'Privacy Policy',
  cookiesLink: 'https://www.tipzonn.com/cookies',
  link1: 'About Us',
  image1Alt: 'Tipzonn Logo',
  link4: 'Terms of Service',
}

Footer4.propTypes = {
  link2: PropTypes.string,
  privacyLink: PropTypes.string,
  link3: PropTypes.string,
  image1Src: PropTypes.string,
  termsLink: PropTypes.string,
  link5: PropTypes.string,
  cookiesLink: PropTypes.string,
  link1: PropTypes.string,
  image1Alt: PropTypes.string,
  link4: PropTypes.string,
}

export default Footer4
