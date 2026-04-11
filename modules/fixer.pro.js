const OpenAI = require("openai");
const fs = require("fs");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function corregirCodigo(error, archivos) {

  const prompt = `
Eres un ingeniero senior Flutter.

Corrige el siguiente error:

${error}

Archivos:
${JSON.stringify(archivos)}

Devuelve JSON:

{
  "fixes": [
    {
      "file": "ruta",
      "content": "codigo corregido"
    }
  ]
}
`;

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  let respuesta = res.choices[0].message.content;

  respuesta = respuesta.replace(/```json/g, "").replace(/```/g, "");

  const json = JSON.parse(respuesta);

  for (const fix of json.fixes) {
    fs.writeFileSync(fix.file, fix.content);
  }

  return json.fixes.length;
}

module.exports = { corregirCodigo };