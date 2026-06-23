export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Token can come from request body (user-provided) or env var (pre-configured)
  const token = req.body.token || process.env.NOTION_TOKEN;
  if (!token) {
    return res.status(400).json({ error: 'No Notion token provided. Add it in the app sidebar or set NOTION_TOKEN in Vercel env vars.' });
  }

  const { database_id, properties } = req.body;
  if (!database_id || !properties) {
    return res.status(400).json({ error: 'Missing database_id or properties' });
  }

  try {
    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28'
      },
      body: JSON.stringify({
        parent: { type: 'database_id', database_id },
        properties
      })
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({ error: err.message || 'Notion API error', details: err });
    }

    const data = await response.json();
    return res.status(200).json({ id: data.id, url: data.url });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
