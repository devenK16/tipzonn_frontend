import React from 'react';

const Rating = () => {
  return (
    <div id="rating-container">
      <img src="rating_meter.png" alt="" width="200" />
      <p>Rate your experience at the restaurant</p>
      <div className="emoji-ratings">
        {['😞', '😐', '😊', '😀', '😍'].map((emoji, index) => (
          <div key={index}>
            <span className="emoji" data-rating={index + 1}>{emoji}</span>
            <div className="rating-text">{['Worst', 'Poor', 'Okay', 'Good', 'Great'][index]}</div>
          </div>
        ))}
      </div>
      <p className="feedback-message">Your feedback helps us get better.</p>
    </div>
  );
};

export default Rating;
