export default async function handler(req, res) {
  // ✅ Proper CORS configuration for Shopify & external embedding
  const allowedOrigins = [
    'https://instantwebsite-ai-proxy.vercel.app',
    'https://admin.shopify.com',
    'https://*.myshopify.com'
  ];

  const origin = req.headers.origin || '';
  const allowed = allowedOrigins.find(o => origin.includes(o));
  res.setHeader('Access-Control-Allow-Origin', allowed || 'https://instantwebsite-ai-proxy.vercel.app');
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Allow only POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, businessType, style, websiteGoal } = req.body;

    if (!name || !email || !businessType || !websiteGoal) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    const previewUrl = `https://instantwebsite-ai-proxy.vercel.app/preview.html?ts=${Date.now()}&name=${encodeURIComponent(
      name
    )}&business=${encodeURIComponent(businessType)}&style=${encodeURIComponent(style)}`;

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
