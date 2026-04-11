const OpenAI = require("openai");
const fs = require("fs");
const path = require("path");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// 🧠 PROMPT PRO
function construirPromptModulo(modulo, idea) {
  return `
Eres un desarrollador senior Flutter.

Genera el código COMPLETO para el módulo: ${modulo}

Contexto de la app:
${idea}

Requisitos:
- Código listo para producción
- Arquitectura limpia
- Separación en capas
- Buen manejo de estado
- Buenas prácticas

Devuelve JSON:

{
  "files": [
    {
      "path": "lib/services/${modulo}_service.dart",
      "content": "codigo completo"
    }
  ]
}

Sin explicación.
`;
}

// 🔥 GENERADOR
async function generarModulo(modulo, idea, proyectoPath) {

  const prompt = construirPromptModulo(modulo, idea);

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3
  });

  let texto = res.choices[0].message.content;

  texto = texto.replace(/```json/g, "").replace(/```/g, "");

  const json = JSON.parse(texto);

  const creados = [];

  for (const file of json.files) {

    const ruta = path.join(proyectoPath, file.path);

    fs.mkdirSync(path.dirname(ruta), { recursive: true });

    fs.writeFileSync(ruta, file.content);

    creados.push(ruta);
  }

  return creados;
}

module.exports = { generarModulo };