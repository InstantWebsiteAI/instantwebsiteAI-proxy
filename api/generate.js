// api/generate.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  try {
    const { name, email, businessType, websiteGoal, style } = req.body || {};

    if (!name || !email || !businessType || !websiteGoal) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // For now, return a deterministic preview URL. You can replace this with your AI HTML generator later.
    const params = new URLSearchParams({
      name, goal: websiteGoal, biz: businessType, style: style || "tech"
    });
    const preview = `https://instantwebsite.ai/demo?${params.toString()}`;

    return res.status(200).json({
      success: true,
      message: "Website generated successfully!",
      preview
    });
  } catch (err) {
    console.error("Error in /api/generate:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
