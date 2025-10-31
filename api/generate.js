export default async function handler(req, res) {
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

    // Build the prompt for your AI generator
    const prompt = `Create a ${style} website for ${businessType}. Goal: ${websiteGoal}. Owner: ${name}`;

    // Here you would call your actual website generation logic
    // For now, return a mock preview URL
    const previewUrl = `https://preview.instantwebsite.ai/${Date.now()}`;

    return res.status(200).json({
      success: true,
      message: 'Your website preview is ready!',
      preview: previewUrl,
      data: { name, email, businessType, style, websiteGoal }
    });

  } catch (error) {
    console.error('Generation error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to generate preview' 
    });
  }
}
