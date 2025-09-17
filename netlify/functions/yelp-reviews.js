// Netlify function: /.netlify/functions/yelp-reviews
// Static data version - no API key required

export async function handler(event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Static Yelp reviews data
  const reviews = [
    {
      id: 'static_review_1',
      url: 'https://www.yelp.com/biz/guss-hot-dog-king-newport-news-2',
      text: 'Best hot dogs in Newport News! The chili is amazing and the service is always friendly. Love the classic diner atmosphere.',
      rating: 5,
      time_created: '2024-01-15T10:30:00Z',
      user: {
        id: 'user_1',
        profile_url: '#',
        image_url: '',
        name: 'Sarah M.'
      }
    },
    {
      id: 'static_review_2',
      url: 'https://www.yelp.com/biz/guss-hot-dog-king-newport-news-2',
      text: 'Been coming here for years. The loaded fries are incredible and the hot dogs are consistently delicious. Great family spot!',
      rating: 5,
      time_created: '2024-01-10T14:20:00Z',
      user: {
        id: 'user_2',
        profile_url: '#',
        image_url: '',
        name: 'Mike T.'
      }
    },
    {
      id: 'static_review_3',
      url: 'https://www.yelp.com/biz/guss-hot-dog-king-newport-news-2',
      text: 'Authentic hot dog joint with amazing BBQ sauce. The staff remembers regulars and the food is always fresh. Highly recommend!',
      rating: 5,
      time_created: '2024-01-05T12:15:00Z',
      user: {
        id: 'user_3',
        profile_url: '#',
        image_url: '',
        name: 'Jennifer L.'
      }
    }
  ];

  return {
    statusCode: 200,
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ reviews: reviews })
  };
}


