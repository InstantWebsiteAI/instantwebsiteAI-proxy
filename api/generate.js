export default async function handler(req, res) {
  // --- CORS ---
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, businessType, style, websiteGoal } = req.body;
    if (!name || !email || !businessType || !websiteGoal) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    // Generate a live HTML preview route (served dynamically)
    const query = new URLSearchParams({
      name,
      businessType,
      style,
      websiteGoal,
      ts: Date.now().toString(),
    }).toString();

    const previewUrl = `https://instantwebsite-ai-proxy.vercel.app/api/preview?${query}`;

    return res.status(200).json({
      success: true,
      message: "Your live AI preview is ready!",
      preview: previewUrl,
    });
  } catch (err) {
    console.error("Generation error:", err);
    return res.status(500).json({
      success: false,
      error: "Failed to generate preview",
    });
  }
}
