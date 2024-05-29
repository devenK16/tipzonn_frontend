import React from 'react'

import PropTypes from 'prop-types'

import './faq1.css'

const FAQ1 = (props) => {
  return (
    <div className="faq1-faq7 thq-section-padding1">
      <div className="faq1-max-width thq-section-max-width">
        <div className="thq-flex-column">
          <h2 className="thq-heading-2">{props.heading1}</h2>
        </div>
        <div className="thq-flex-column faq1-list">
          <div className="faq1-list-item1">
            <p className="faq1-faq1-question thq-body-large">
              {props.faq1Question}
            </p>
            <span className="thq-body-small">{props.faq1Answer}</span>
          </div>
          <div className="faq1-list-item2">
            <p className="faq1-faq2-question thq-body-large">
              {props.faq2Question}
            </p>
            <span className="thq-body-small">{props.faq2Answer}</span>
          </div>
          <div className="faq1-list-item3">
            <p className="faq1-faq3-question thq-body-large">
              {props.faq3Question}
            </p>
            <span className="thq-body-small">{props.faq3Answer}</span>
          </div>
          <div className="faq1-list-item4">
            <p className="faq1-faq4-question thq-body-large">
              {props.faq4Question}
            </p>
            <span className="thq-body-small">{props.faq4Answer}</span>
          </div>
          <div className="faq1-list-item5">
            <p className="faq1-faq5-question thq-body-large">
              {props.faq5Question}
            </p>
            <span className="thq-body-small">{props.faq5Answer}</span>
          </div>
        </div>
        <div className="thq-flex-column">
          <div className="faq1-content1">
            <h2 className="thq-heading-2">{props.heading2}</h2>
          </div>
          <div className="faq1-container">
            <button className="thq-button-outline faq1-button">
              <span className="thq-body-small">{props.action1}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

FAQ1.defaultProps = {
  faq1Question: 'How does Tipzonn work for businesses?',
  faq4Answer:
    'Yes, Tipzonn makes it simple for employees to receive tips in a cashless manner, providing convenience for both customers and staff.',
  faq1Answer:
    'Tipzonn provides a digital platform for businesses to receive tips and reviews from customers, helping to drive sales through increased service quality.',
  faq5Question: 'Can customers leave reviews for businesses on Tipzonn?',
  faq5Answer:
    'Yes, customers can leave reviews for businesses on Tipzonn, helping other users make informed decisions.',
  faq2Answer:
    'Yes, Tipzonn makes it simple for customers to show appreciation for service workers with cashless tipping.',
  faq2Question: 'Is it easy for customers to tip using Tipzonn?',
  faq4Question: 'Are employees able to easily receive tips through Tipzonn?',
  faq3Question: 'How can businesses benefit from using Tipzonn?',
  heading1: 'FAQs',
  faq3Answer:
    'Businesses can benefit from increased service quality, enabling customers to reward great service and leaving positive reviews.',
  action1: 'Contact',
  heading2: 'Still have a question?',
}

FAQ1.propTypes = {
  faq1Question: PropTypes.string,
  faq4Answer: PropTypes.string,
  faq1Answer: PropTypes.string,
  faq5Question: PropTypes.string,
  faq5Answer: PropTypes.string,
  faq2Answer: PropTypes.string,
  faq2Question: PropTypes.string,
  faq4Question: PropTypes.string,
  faq3Question: PropTypes.string,
  heading1: PropTypes.string,
  faq3Answer: PropTypes.string,
  action1: PropTypes.string,
  heading2: PropTypes.string,
}

export default FAQ1
