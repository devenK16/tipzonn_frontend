import React from 'react'

import PropTypes from 'prop-types'

import './hero12.css'

import { WavyBackground } from '../components/ui/wavy-background';

const Hero12 = (props) => {
  return (
    <WavyBackground>
      <div className="hero12-max-width">
        <div className="thq-flex-row1">
          <div className="hero12-column">
            <div className="hero12-content">
              <h1 className="hero12-heading1">
                {props.heading1}
              </h1>
              <p className="hero12-content1">{props.content1}</p>
            </div>
          </div>
          <div className="hero12-container1">
            <img
              alt={props.image1Alt}
              src={props.image1Src}
              className="hero12-image1 thq-img-ratio-4-3"
            />
          </div>
        </div>
      </div>
  </WavyBackground>
  )
}

Hero12.defaultProps = {
  content1: "At Tipzonn, we’re revolutionize the tipping experience in India. Our user-friendly platform offers a secure and convenient way to tip, making it easier than ever to show your gratitude. ",
  heading1: "India's Leading Tipping Platform",
  image1Src:
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcxNjgzMTYxMHw&ixlib=rb-4.0.3&q=80&w=1080',
  image1Alt: 'Illustration of a happy service worker receiving a digital tip',
  action2: 'Sign up now',
}

Hero12.propTypes = {
  content1: PropTypes.string,
  heading1: PropTypes.string,
  image1Src: PropTypes.string,
  image1Alt: PropTypes.string,
  action2: PropTypes.string,
}

export default Hero12

