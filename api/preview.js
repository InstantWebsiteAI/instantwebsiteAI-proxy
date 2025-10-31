export default async function handler(req, res) {
  const { name, businessType, style, websiteGoal, ts } = req.query;
  res.setHeader("Content-Type", "text/html");

  // === THEME LOGIC ===
  let theme = {
    background: "linear-gradient(135deg,#0e0e12,#1a1a2e)",
    color: "#fff",
    accent: "#00bfff",
    cardBg: "rgba(255,255,255,0.06)",
    glow: "0 0 25px rgba(0,191,255,0.3)",
  };

  switch (style?.toLowerCase()) {
    case "bold":
      theme = {
        background: "linear-gradient(135deg,#ff00cc,#3333ff)",
        color: "#fff",
        accent: "#ff7b00",
        cardBg: "rgba(255,255,255,0.08)",
        glow: "0 0 25px rgba(255,100,255,0.4)",
      };
      break;
    case "modern":
      theme = {
        background: "linear-gradient(135deg,#e0eafc,#cfdef3)",
        color: "#111",
        accent: "#0078ff",
        cardBg: "rgba(255,255,255,0.8)",
        glow: "0 0 20px rgba(0,0,0,0.1)",
      };
      break;
    case "minimal":
      theme = {
        background: "#f6f8fa",
        color: "#222",
        accent: "#007bff",
        cardBg: "#fff",
        glow: "0 0 12px rgba(0,0,0,0.05)",
      };
      break;
    default:
      break;
  }

  // === HTML OUTPUT ===
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${name}'s ${businessType} Website Preview</title>
<style>
  body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background: ${theme.background};
    color: ${theme.color};
    text-align: center;
  }

  .hero {
    padding: 100px 20px 80px;
  }

  h1 {
    font-size: 2.8rem;
    margin-bottom: 12px;
    background: linear-gradient(90deg, ${theme.accent}, #00ffae);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p.sub {
    font-size: 1.1rem;
    opacity: 0.85;
    max-width: 600px;
    margin: 0 auto 25px;
  }

  .cta {
    display: inline-block;
    background: ${theme.accent};
    color: #fff;
    font-weight: 600;
    padding: 14px 32px;
    border-radius: 40px;
    text-decoration: none;
    box-shadow: ${theme.glow};
    transition: transform .25s ease, box-shadow .25s ease;
  }

  .cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 35px ${theme.accent};
  }

  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 24px;
    padding: 80px 20px 100px;
    max-width: 1000px;
    margin: auto;
  }

  .card {
    background: ${theme.cardBg};
    padding: 24px 18px 28px;
    border-radius: 18px;
    box-shadow: ${theme.glow};
    transition: transform .25s ease, box-shadow .25s ease;
  }

  .card:hover {
    transform: translateY(-6px);
    box-shadow: 0 0 35px ${theme.accent};
  }

  .card h3 {
    color: ${theme.accent};
    margin-bottom: 12px;
  }

  footer {
    opacity: 0.7;
    font-size: 0.85rem;
    padding: 40px 0;
  }
</style>
</head>
<body>
  <section class="hero">
    <h1>🚀 ${name}'s ${businessType} Website</h1>
    <p class="sub">${websiteGoal || "Building your online presence with style and purpose."}</p>
    <a class="cta" href="#">Get Started</a>
  </section>

  <section class="features">
    <div class="card">
      <h3>✨ Modern Design</h3>
      <p>Built for impact — ${businessType} that stands out with clean visuals and sleek gradients.</p>
    </div>
    <div class="card">
      <h3>⚙️ Smart Features</h3>
      <p>Integrated sections to help you ${websiteGoal || "reach your goals effortlessly"}.</p>
    </div>
    <div class="card">
      <h3>📈 Scalable Growth</h3>
      <p>Designed to evolve with your brand — from startup to success story.</p>
    </div>
  </section>

  <footer>
    Generated for ${name} • ${new Date(parseInt(ts)).toLocaleString()} • Powered by InstantWebsite.ai
  </footer>
</body>
</html>`);
}
