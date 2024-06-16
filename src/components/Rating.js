import React, { useState, useEffect, useCallback } from 'react';
import './Rating.css'; // Ensure to import your CSS file
const Rating = () => {
  const [user, setUser] = useState(null);
  const [placeId, setPlaceId] = useState(null);
  const [showReviewCard, setShowReviewCard] = useState(false);
  const [reviewMessage, setReviewMessage] = useState('');
  const [selectedRating, setSelectedRating] = useState(null);
  const [showNotification, setShowNotification] = useState(false); // new changes
   const userId = new URLSearchParams(window.location.search).get('tzId');
 
  // Fetch user details
  const fetchUserDetails = useCallback(async () => {
    if (!userId) {
      console.error('User ID not found in the URL');
      return null;
    }

    try {
      const response = await fetch(`https://backend.tipzonn.com/api/users/${userId}`);
   
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
      const userDetails = await response.json();
      setUser(userDetails);
      return userDetails;
    } catch (error) {
      console.error('Error fetching user details:', error);
      return null;
    }
  }, [userId]);

  // Fetch place ID
  const getPlaceId = useCallback(async (name, address) => {
    const input = `${name}, ${address}`;
    const endpoint = `https://backend.tipzonn.com/api/place?input=${encodeURIComponent(input)}`;

    try {
      const response = await fetch(endpoint);
      const data = await response.json();
    

      if (data.candidates && data.candidates.length > 0) {
        setPlaceId(data.candidates[0].place_id);
        return data.candidates[0].place_id;
      }
      return null;
    } catch (error) {
      console.error('Error fetching place ID:', error);
    
      return null;
    }
  
  }, []);

  // useEffect(() => {
  //   console.log('placeId:', placeId);
  // }, [placeId]);


  // Handle emoji click
  const handleEmojiClick = async (rating) => {
    setSelectedRating(rating); // Set the selected rating
    if (rating >= 4) {
      if (user) {
        const userDetails = await fetchUserDetails();
        if (userDetails) {
          await getPlaceId(userDetails.name, userDetails.address);
        } else {
          alert('Unable to fetch user details. Please try again.');
          return;
        }
      }
    } else {
      setShowReviewCard(true);
    }
  };

  // Handle review submit
  const handleSubmitReview = async () => {
    if (!reviewMessage) { // new changes
      setShowNotification(true); // new changes
      setTimeout(() => setShowNotification(false), 3000); // new changes
      return; // new changes
    }
    try {
      const response = await fetch(`https://backend.tipzonn.com/api/reviews/addReview/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reviewText: reviewMessage, rating: selectedRating }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      const result = await response.json();
      
      setReviewMessage(''); // Clear the review message after submission
      setShowReviewCard(false); // Close the review card after submission
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };


  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  useEffect(() => {
    if (placeId) {
      window.location.href = `https://search.google.com/local/reviews?placeid=${placeId}`;
    }
  }, [placeId]);

  // Handle click outside the review card to close it
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('overlay')) {
      setShowReviewCard(false);
    }
  };

  return (
    <div id="rating-container">
      {showNotification && (
        <div className={`notification ${showNotification ? 'show' : ''}`}>
          Review cannot be empty
          <button className="close-btn" onClick={() => setShowNotification(false)}>×</button>
        </div>
      )}
      <img src="rating_meter.png" alt="" width="200" className='rating-container-img'/>
      <p>Rate your experience at the restaurant</p>
      <div className="emoji-ratings">
        {['😞', '😐', '😊', '😀', '😍'].map((emoji, index) => (
          <div key={index} onClick={() => handleEmojiClick(index + 1)}>
            <span className="emoji" data-rating={index + 1}>{emoji}</span>
            <div className="rating-text">{['Worst', 'Poor', 'Okay', 'Good', 'Great'][index]}</div>
          </div>
        ))}
      </div>
      <p className="feedback-message">Your feedback helps us get better.</p>
      {showReviewCard && (
        <div className="overlay" onClick={handleOutsideClick}>
          <div className="review-card">
          <h3>Add your review</h3> 
            <textarea
              placeholder="Enter your review to get us better..."
              value={reviewMessage}
              onChange={(e) => setReviewMessage(e.target.value)}
            />
            <button onClick={handleSubmitReview}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rating;
