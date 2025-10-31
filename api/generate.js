export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
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

    // For now, return a success response with mock data
    // Later you can integrate actual AI website generation here
    const previewUrl = `https://instantwebsite-ai-proxy.vercel.app/preview.html?ts=${Date.now()}&name=${encodeURIComponent(name)}&business=${encodeURIComponent(businessType)

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
