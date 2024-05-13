const emojis = document.querySelectorAll('.emoji');
const ratingContainer = document.getElementById('rating-container');

emojis.forEach(emoji => {
  emoji.addEventListener('click', () => {
    const rating = emoji.dataset.rating;
    if (rating >= 3) {
       window.location.href = "https://search.google.com/local/reviews?placeid=ChIJBVW3rfqvUQ0RgTHzJQPqHTk";
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
