import React, { useState, useEffect, useCallback } from 'react';
import './Rating.css'; // Ensure to import your CSS file
const Rating = () => {
  const [user, setUser] = useState(null);
  const [placeId, setPlaceId] = useState(null);
  const [showReviewCard, setShowReviewCard] = useState(false);
  const [reviewMessage, setReviewMessage] = useState('');
   const userId = new URLSearchParams(window.location.search).get('tzId');
 
  // Fetch user details
  const fetchUserDetails = useCallback(async () => {
    if (!userId) {
      console.error('User ID not found in the URL');
      return null;
    }

    console.log('Fetching user details with userId:', userId);

    try {
      const response = await fetch(`https://backend.tipzonn.com/api/users/${userId}`);
   
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
      const userDetails = await response.json();
      console.log('userDetails', userDetails);
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
    console.log('Fetching place ID with input:', input);
    console.log('Endpoint:', endpoint);
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      
      console.log('Place ID response:', data);

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
    console.log('handleEmojiClick called with rating:', rating);
    if (rating >= 3) {
      if (user) {
        const userDetails = await fetchUserDetails();
        console.log('Calling getPlaceId with name:', userDetails.name, 'and address:', userDetails.address);
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
    try {
      const response = await fetch(`https://backend.tipzonn.com/api/reviews/addReview/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reviewText: reviewMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      const result = await response.json();
      console.log('Review submitted successfully:', result);
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
      console.log('placeId:', placeId);
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
