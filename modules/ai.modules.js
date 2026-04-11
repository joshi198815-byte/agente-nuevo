const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function detectarModulos(idea) {

  const prompt = `
Analiza esta idea de app y devuelve SOLO JSON:

Idea:
${idea}

Devuelve:

{
  "modulos": ["auth", "pagos", "chat", "notificaciones", "mapas", "admin"]
}

Sin explicación.
`;

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  let texto = res.choices[0].message.content;

  texto = texto.replace(/```json/g, "").replace(/```/g, "");

  return JSON.parse(texto);
}

module.exports = { detectarModulos };