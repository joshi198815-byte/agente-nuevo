const OpenAI = require("openai");
const fs = require("fs");
const path = require("path");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// 🔥 PROMPT PRO
function construirPrompt(nombrePantalla, idea) {
  return `
Eres un desarrollador experto en Flutter nivel senior.

Genera un archivo COMPLETO en Dart para la pantalla "${nombrePantalla}".

Requisitos:
- Código limpio y profesional
- Uso de buenas prácticas
- UI moderna
- Separación de widgets
- Preparado para producción
- Compatible con apps tipo Uber si aplica

Contexto de la app:
${idea}

Devuelve SOLO código Dart, sin explicaciones.
`;
}

// 🔥 GENERADOR IA
async function generarPantallaIA(nombrePantalla, idea, proyectoPath) {

  const prompt = construirPrompt(nombrePantalla, idea);

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Eres experto Flutter senior" },
      { role: "user", content: prompt }
    ]
  });

  let codigo = res.choices[0].message.content;

  // limpiar markdown si viene
  codigo = codigo.replace(/```dart/g, "").replace(/```/g, "");

  const ruta = path.join(
    proyectoPath,
    "lib",
    "screens",
    `${nombrePantalla}.dart`
  );

  fs.writeFileSync(ruta, codigo);

  return ruta;
}

module.exports = { generarPantallaIA };