import React, { useState, useEffect, useCallback } from 'react';

const Rating = () => {
  const [user, setUser] = useState(null);
  const [placeId, setPlaceId] = useState(null);
  const apiKey = 'AIzaSyAljAEF6dH41ODhNtoYtpJWHLKcV4ockno'; // Replace with your actual Google API key
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
    const endpoint = `https://backend.tipzonn.com/api/place?input=${encodeURIComponent(input)}&key=${apiKey}`;
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
  
  }, [apiKey]);

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

  return (
    <div id="rating-container">
      <img src="rating_meter.png" alt="" width="200" />
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
    </div>
  );
};

export default Rating;
