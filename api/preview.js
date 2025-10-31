// /api/preview.js
export default async function handler(req, res) {
  const { name, businessType, style, websiteGoal, ts } = req.query;
  res.setHeader("Content-Type", "text/html");

  // === AI COPY GENERATION (optional) ===
  let headline = `${name}'s ${businessType} Website`;
  let sub = websiteGoal || "Building your online presence with style and purpose.";
  let features = [
    { title: "✨ Modern Design", text: `A fresh, engaging look that reflects ${businessType || 'your business'} energy.` },
    { title: "⚙️ Smart Features", text: `Tools that help you ${websiteGoal || 'reach your goals'}.` },
    { title: "📈 Scalable Growth", text: `Ready to grow with your success — built for ${businessType || 'professionals'}.` }
  ];

  try {
    // Optional: connect your OpenAI or other LLM
    const key = process.env.OPENAI_API_KEY;
    if (key) {
      const prompt = `Write a short catchy hero headline and 3 one-sentence feature blurbs for a ${style} ${businessType} website.
      The goal: ${websiteGoal}. The owner is ${name}. 
      Respond ONLY with valid JSON in this exact format: {"headline":"...","sub":"...","features":[{"title":"...","text":"..."}]}`;
      
      const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.8,
        }),
      });
      
      const data = await aiRes.json();
      const content = data.choices?.[0]?.message?.content;
      
      if (content) {
        const parsed = JSON.parse(content);
        if (parsed.headline) headline = parsed.headline;
        if (parsed.sub) sub = parsed.sub;
        if (parsed.features && Array.isArray(parsed.features) && parsed.features.length > 0) {
          features = parsed.features;
        }
      }
    }
  } catch (e) {
    console.error("AI generation failed:", e.message);
    // Falls back to default content
  }

  // === THEME LOGIC ===
  let theme = {
    background: "linear-gradient(135deg,#0e0e12,#1a1a2e)",
    color: "#fff",
    accent: "#00bfff",
    cardBg: "rgba(255,255,255,0.06)",
    glow: "0 0 25px rgba(0,191,255,0.3)",
  };
  if (style === "bold") theme = { background: "linear-gradient(135deg,#ff00cc,#3333ff)", color:"#fff", accent:"#ff7b00", cardBg:"rgba(255,255,255,0.08)", glow:"0 0 25px rgba(255,100,255,0.4)" };
  if (style === "modern") theme = { background:"linear-gradient(135deg,#e0eafc,#cfdef3)", color:"#111", accent:"#0078ff", cardBg:"rgba(255,255,255,0.8)", glow:"0 0 20px rgba(0,0,0,0.1)" };
  if (style === "minimal") theme = { background:"#f6f8fa", color:"#222", accent:"#007bff", cardBg:"#fff", glow:"0 0 12px rgba(0,0,0,0.05)" };

  // === HTML ===
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1.0" />
<title>${headline}</title>
<style>
  body{margin:0;font-family:'Poppins',sans-serif;background:${theme.background};color:${theme.color};text-align:center;}
  .hero{padding:100px 20px 70px;}
  h1{font-size:2.8rem;margin-bottom:12px;background:linear-gradient(90deg,${theme.accent},#00ffae);
     -webkit-background-clip:text;-webkit-text-fill-color:transparent;}
  p.sub{font-size:1.1rem;opacity:.9;max-width:620px;margin:0 auto 25px;}
  .cta{display:inline-block;background:${theme.accent};color:#fff;font-weight:600;
     padding:14px 32px;border-radius:40px;text-decoration:none;box-shadow:${theme.glow};
     transition:transform .25s ease,box-shadow .25s ease;}
  .cta:hover{transform:translateY(-3px);box-shadow:0 0 35px ${theme.accent};}
  .features{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));
     gap:24px;padding:80px 20px 100px;max-width:1000px;margin:auto;}
  .card{background:${theme.cardBg};padding:24px 18px 28px;border-radius:18px;
     box-shadow:${theme.glow};transition:transform .25s ease,box-shadow .25s ease;}
  .card:hover{transform:translateY(-6px);box-shadow:0 0 35px ${theme.accent};}
  .card h3{color:${theme.accent};margin-bottom:12px;}
  footer{opacity:.7;font-size:.85rem;padding:40px 0;}
</style>
</head>
<body>
  <section class="hero">
    <h1>${headline}</h1>
    <p class="sub">${sub}</p>
    <a class="cta" href="#">Get Started</a>
  </section>
  <section class="features">
    ${features.map(f=>`<div class="card"><h3>${f.title}</h3><p>${f.text}</p></div>`).join("")}
  </section>
  <footer>Generated for ${name} • ${new Date(parseInt(ts)).toLocaleString()} • Powered by InstantWebsite.ai</footer>
</body>
</html>`);
}
