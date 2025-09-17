// Vercel-style serverless function for Facebook ratings/recommendations
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

  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FACEBOOK_PAGE_ID || 'Gusshotdogking';
  const apiVersion = process.env.FACEBOOK_API_VERSION || 'v19.0';
  if (!token) {
    res.status(500).json({ error: 'Missing FACEBOOK_PAGE_ACCESS_TOKEN' });
    return;
  }

  async function tryEndpoint(url) {
    const fbRes = await fetch(url);
    if (!fbRes.ok) throw new Error('FB request failed');
    return fbRes.json();
  }

  try {
    const base = `https://graph.facebook.com/${apiVersion}/${encodeURIComponent(pageId)}`;
    let data;
    try {
      data = await tryEndpoint(`${base}/ratings?access_token=${encodeURIComponent(token)}&limit=3`);
    } catch (e) {
      data = await tryEndpoint(`${base}/recommendations?access_token=${encodeURIComponent(token)}&limit=3`);
    }
    const items = (data && data.data) || [];
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(JSON.stringify({ reviews: items }));
  } catch (err) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(500).json({ error: 'Failed to fetch Facebook reviews' });
  }
}


