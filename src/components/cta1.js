import React from 'react'

import PropTypes from 'prop-types'

import './cta1.css'

const CTA1 = (props) => {
  return (
    <div className="cta1-container thq-section-padding1">
      <div className="cta1-max-width thq-section-max-width">
        <div className="cta1-content">
          <h2 className="cta1-heading1 thq-heading-2">{props.heading1}</h2>
          <p className="cta1-content1 thq-body-large">{props.content1}</p>
          <div className="cta1-actions">
            <button className="thq-button-filled cta1-button">
              <span className="cta1-action1 thq-body-small">
                {props.action1}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

CTA1.defaultProps = {
  content1:
    'Join Tipzonn today and start rewarding great service with just a few clicks.',
  heading1: 'Ready to revolutionize tipping?',
  action1: 'Sign Up Now',
}

CTA1.propTypes = {
  content1: PropTypes.string,
  heading1: PropTypes.string,
  action1: PropTypes.string,
}

export default CTA1
