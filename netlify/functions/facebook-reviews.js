// Netlify function: /.netlify/functions/facebook-reviews
// Static data version - no API token required

export async function handler(event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Static Facebook reviews data
  const reviews = [
    {
      id: 'fb_static_review_1',
      created_time: '2024-01-15T10:30:00+0000',
      message: 'Amazing hot dogs! The chili cheese dog is my favorite. Great service and friendly staff. Will definitely be back!',
      rating: 5,
      from: {
        id: 'fb_user_1',
        name: 'David Rodriguez'
      }
    },
    {
      id: 'fb_static_review_2',
      created_time: '2024-01-12T16:45:00+0000',
      message: 'Best hot dog joint in the area! Love the loaded fries and the atmosphere. Perfect place for a quick lunch.',
      rating: 5,
      from: {
        id: 'fb_user_2',
        name: 'Lisa Thompson'
      }
    },
    {
      id: 'fb_static_review_3',
      created_time: '2024-01-08T19:20:00+0000',
      message: 'Been a customer for years. The quality never disappoints and the staff is always welcoming. Highly recommend!',
      rating: 5,
      from: {
        id: 'fb_user_3',
        name: 'Robert Wilson'
      }
    }
  ];

  return {
    statusCode: 200,
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ reviews: reviews })
  };
}


