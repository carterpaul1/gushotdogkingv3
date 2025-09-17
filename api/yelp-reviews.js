// Vercel-style serverless function for Yelp reviews
export default async function handler(req, res) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };

  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
    return;
  }

  const apiKey = process.env.YELP_API_KEY;
  const businessId = process.env.YELP_BUSINESS_ID || 'guss-hot-dog-king-newport-news-2';
  if (!apiKey) {
    res.status(500).json({ error: 'Missing YELP_API_KEY' });
    return;
  }

  try {
    const yelpRes = await fetch(`https://api.yelp.com/v3/businesses/${encodeURIComponent(businessId)}/reviews?limit=3&sort_by=yelp_sort`, {
      headers: { Authorization: `Bearer ${apiKey}` }
    });
    if (!yelpRes.ok) {
      const text = await yelpRes.text();
      res.status(yelpRes.status).setHeader('Content-Type', 'application/json').setHeader('Access-Control-Allow-Origin', '*').send(text);
      return;
    }
    const data = await yelpRes.json();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(JSON.stringify({ reviews: data.reviews || [] }));
  } catch (err) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(500).json({ error: 'Failed to fetch Yelp reviews' });
  }
}


