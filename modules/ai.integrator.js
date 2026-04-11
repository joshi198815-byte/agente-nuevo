const OpenAI = require("openai");
const fs = require("fs");
const path = require("path");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function integrarApp(proyectoPath, modulos, idea) {

  const prompt = `
Eres un arquitecto Flutter senior.

Tengo estos módulos generados:
${modulos.join(", ")}

Y esta idea:
${idea}

Genera los archivos necesarios para conectar toda la app:

- main.dart
- app.dart
- routes.dart

Requisitos:
- navegación funcional
- imports correctos
- estructura profesional
- MaterialApp configurado
- rutas dinámicas

Devuelve JSON:

{
  "files": [
    {
      "path": "lib/main.dart",
      "content": "codigo completo"
    }
  ]
}

Sin explicación.
`;

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2
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

module.exports = { integrarApp };