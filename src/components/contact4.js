import React from 'react'

import PropTypes from 'prop-types'

import './contact4.css'

const Contact4 = (props) => {
  return (
    <div className="contact4-contact20 thq-section-padding">
      <div className="contact4-max-width thq-section-max-width">
        <div className="contact4-section-title">
          <div className="contact4-content">
            <h2 className="thq-heading-2">{props.heading1}</h2>
            <p className="contact4-text1 thq-body-large">{props.content1}</p>
          </div>
        </div>
        <div className="contact4-row">
          <div className="contact4-content1">
            <svg viewBox="0 0 1024 1024" className="thq-icon-medium">
              <path d="M854 342v-86l-342 214-342-214v86l342 212zM854 170q34 0 59 26t25 60v512q0 34-25 60t-59 26h-684q-34 0-59-26t-25-60v-512q0-34 25-60t59-26h684z"></path>
            </svg>
            <div className="contact4-contact-info">
              <div className="contact4-content2">
                <h3 className="contact4-text2 thq-heading-3">Email</h3>
                <p className="contact4-text3 thq-body-large">
                  {props.content3}
                </p>
              </div>
              <span className="contact4-email thq-body-small">
                {props.email1}
              </span>
            </div>
          </div>
          <div className="contact4-content3">
            <svg
              viewBox="0 0 1024 1024"
              className="contact4-icon2 thq-icon-medium"
            >
              <path d="M282 460q96 186 282 282l94-94q20-20 44-10 72 24 152 24 18 0 30 12t12 30v150q0 18-12 30t-30 12q-300 0-513-213t-213-513q0-18 12-30t30-12h150q18 0 30 12t12 30q0 80 24 152 8 26-10 44z"></path>
            </svg>
            <div className="contact4-contact-info1">
              <div className="contact4-content4">
                <h3 className="contact4-text4 thq-heading-3">Phone</h3>
                <p className="contact4-text5 thq-body-large">
                  {props.content4}
                </p>
              </div>
              <span className="contact4-phone thq-body-small">
                {props.phone1}
              </span>
            </div>
          </div>
          <div className="contact4-content5">
            <svg
              viewBox="0 0 1024 1024"
              className="contact4-icon4 thq-icon-medium"
            >
              <path d="M512 0c-176.732 0-320 143.268-320 320 0 320 320 704 320 704s320-384 320-704c0-176.732-143.27-320-320-320zM512 512c-106.040 0-192-85.96-192-192s85.96-192 192-192 192 85.96 192 192-85.96 192-192 192z"></path>
            </svg>
            <div className="contact4-contact-info2">
              <div className="contact4-content6">
                <h3 className="contact4-text6 thq-heading-3">Office</h3>
                <p className="contact4-text7 thq-body-large">
                  {props.content5}
                </p>
              </div>
              <span className="contact4-address thq-body-small">
                {props.address1}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Contact4.defaultProps = {
  heading1: 'Contact Us',
  content4: 'Connect with us on Facebook, Instagram, and Twitter.',
  content3: 'Follow us on social media for updates and more.',
  content1:
    "We'd love to hear from you! Reach out to us for any questions or feedback.",
  phone1: '+91 9322136520',
  content5: 'Stay in touch with Tipzonn for the latest news and features.',
  email1: 'info@tipzonn.com',
  address1: 'Laxmi Nagar, Sewagram road, Wardha, Maharashtra - 442001',
}

Contact4.propTypes = {
  heading1: PropTypes.string,
  content4: PropTypes.string,
  content3: PropTypes.string,
  content1: PropTypes.string,
  phone1: PropTypes.string,
  content5: PropTypes.string,
  email1: PropTypes.string,
  address1: PropTypes.string,
}

export default Contact4
