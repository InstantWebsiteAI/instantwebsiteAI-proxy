export default async function handler(req, res) {
  // Set CORS headers - allow all origins
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, businessType, style, websiteGoal } = req.body;

    // Validate required fields
    if (!name || !email || !businessType || !websiteGoal) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    // Create preview URL with correct domain
    const previewUrl = `https://instantwebsite-ai-proxy.vercel.app/preview.html?ts=${Date.now()}&name=${encodeURIComponent(name)}&business=${encodeURIComponent(businessType)}&style=${encodeURIComponent(style)}`;

    return res.status(200).json({
      success: true,
      message: 'Your website preview is ready!',
      preview: previewUrl
    });

  } catch (error) {
    console.error('Generation error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to generate preview. Please try again.' 
    });
  }
}
