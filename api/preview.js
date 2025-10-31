export default async function handler(req, res) {
  const { name, businessType, style, websiteGoal, ts } = req.query;

  res.setHeader("Content-Type", "text/html");

  const background =
    style === "bold"
      ? "linear-gradient(135deg,#ff00cc,#3333ff)"
      : style === "modern"
      ? "linear-gradient(135deg,#e0eafc,#cfdef3)"
      : style === "minimal"
      ? "#f6f8fa"
      : "linear-gradient(135deg,#0e0e12,#1a1a2e)";

  const color = style === "minimal" ? "#111" : "#fff";

  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${businessType} — AI Preview</title>
  <style>
    body {
      margin: 0; padding: 60px 20px;
      font-family: 'Poppins', sans-serif;
      text-align: center;
      background: ${background};
      color: ${color};
    }
    .card {
      background: rgba(255,255,255,0.07);
      padding: 40px; border-radius: 20px;
      max-width: 650px; margin: auto;
      box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    }
    h1 {
      font-size: 2.4rem;
      background: linear-gradient(90deg,#00bfff,#00ffae);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
    }
    p { font-size: 1.05rem; line-height: 1.6; }
    .meta { margin-top: 30px; font-size: 0.9rem; opacity: 0.8; }
  </style>
</head>
<body>
  <div class="card">
    <h1>🚀 ${name}'s ${businessType} Website</h1>
    <p><strong>Goal:</strong> ${websiteGoal}</p>
    <p><strong>Style:</strong> ${style}</p>
    <div class="meta">Generated: ${new Date(parseInt(ts)).toLocaleString()}</div>
  </div>
</body>
</html>`);
}
