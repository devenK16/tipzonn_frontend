const emojis = document.querySelectorAll('.emoji');
const apiKey = 'AIzaSyAljAEF6dH41ODhNtoYtpJWHLKcV4ockno'; // Replace with your actual Google API key

emojis.forEach(emoji => {
  emoji.addEventListener('click', async () => {
    const rating = emoji.dataset.rating;
    if (rating >= 3) {
      const user = await fetchUserDetails();
      if (user) {
        const placeId = await getPlaceId(user.name, user.address, apiKey);
        if (placeId) {
          window.location.href = `https://search.google.com/local/reviews?placeid=${placeId}`;
        } else {
          alert('Unable to find place ID. Please try again.');
        }
      } else {
        alert('Unable to fetch user details. Please try again.');
      }
    }
  });

  emoji.addEventListener('mouseover', () => {
    const rating = emoji.dataset.rating;
    updateEmojis(rating);
  });

  emoji.addEventListener('mouseout', () => {
    updateEmojis(0);
  });
});

function updateEmojis(rating) {
  emojis.forEach((emoji, index) => {
    if (index < rating) {
      emoji.classList.add('active');
    } else {
      emoji.classList.remove('active');
    }
  });
}

async function fetchUserDetails() {
  const userId = getQueryParam('tzId'); // Assuming tzId is passed in the URL
  if (!userId) {
    console.error('User ID not found in the URL');
    return null;
  }

  try {
    const response = await fetch(`https://backend-staging.tipzonn.com/api/users/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user details');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null;
  }
}

async function getPlaceId(name, address, apiKey) {
  const input = `${name}, ${address}`;
  const endpoint = `http://localhost:8000/api/place?input=${encodeURIComponent(input)}&key=${apiKey}`; // Ensure this matches your backend server URL

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].place_id;
    }
    return null;
  } catch (error) {
    console.error('Error fetching place ID:', error);
    return null;
  }
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}