import React from 'react'

import PropTypes from 'prop-types'

import './features18.css'

const Features18 = (props) => {
  return (
    <div className="features18-layout349 thq-section-padding1">
      <div className="features18-max-width thq-section-max-width">
        <div className="features18-content">
          <div className="features18-section-title">
            <div className="features18-content1">
              <h2 className="thq-heading-2">{props.feature1Title}</h2>
              <p className="thq-body-large">{props.feature1Description}</p>
            </div>
          </div>
        </div>
        <div className="features18-image-container">
          <img
            alt={props.feature1ImageAlt}
            src={props.feature1ImageSrc}
            className="thq-img-ratio-16-9"
          />
        </div>
      </div>
    </div>
  )
}

Features18.defaultProps = {
  feature1ImageSrc:
    'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcxNjgzMTYxMXw&ixlib=rb-4.0.3&q=80&w=1080',
  feature1Description:
    'By enabling customers to easily reward great service, businesses can drive sales through enhanced customer satisfaction and loyalty.',
  feature1ImageAlt: 'Increased service quality',
  feature1Title: 'Drive Sales with Improved Service Quality',
}

Features18.propTypes = {
  feature1ImageSrc: PropTypes.string,
  feature1Description: PropTypes.string,
  feature1ImageAlt: PropTypes.string,
  feature1Title: PropTypes.string,
}

export default Features18
