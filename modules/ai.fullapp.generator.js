const OpenAI = require("openai");
const fs = require("fs");
const path = require("path");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// 🧠 PROMPT PROFESIONAL
function construirPromptApp(idea) {
  return `
Eres un arquitecto senior en Flutter.

Genera la estructura COMPLETA de una app profesional basada en esta idea:

${idea}

Requisitos:
- Arquitectura limpia (clean architecture)
- Separación en capas (data, domain, presentation)
- Código modular
- Preparado para producción
- Manejo de estado (Provider o Riverpod)
- Navegación estructurada
- Servicios desacoplados
- Código listo para escalar

Devuelve en formato JSON así:

{
  "files": [
    {
      "path": "lib/presentation/screens/home_screen.dart",
      "content": "codigo dart completo"
    }
  ]
}

No expliques nada. Solo JSON.
`;
}

// 🧠 GENERADOR COMPLETO
async function generarAppCompleta(idea, proyectoPath) {

  const prompt = construirPromptApp(idea);

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Eres un arquitecto Flutter experto" },
      { role: "user", content: prompt }
    ],
    temperature: 0.3
  });

  let respuesta = res.choices[0].message.content;

  // limpiar markdown
  respuesta = respuesta.replace(/```json/g, "").replace(/```/g, "");

  let json;

  try {
    json = JSON.parse(respuesta);
  } catch (err) {
    throw new Error("Error parseando respuesta IA");
  }

  const creados = [];

  for (const file of json.files) {

    const rutaCompleta = path.join(proyectoPath, file.path);

    fs.mkdirSync(path.dirname(rutaCompleta), { recursive: true });

    fs.writeFileSync(rutaCompleta, file.content);

    creados.push(rutaCompleta);
  }

  return creados;
}

module.exports = { generarAppCompleta };