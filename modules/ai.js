require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// BASE
async function preguntar(system, user) {
  const res = await openai.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      { role: "system", content: system },
      { role: "user", content: user }
    ],
    temperature: 0.4
  });

  return res.choices[0].message.content;
}

// DEV
async function devAI(prompt) {
  return await preguntar(
    `Eres desarrollador senior experto en Flutter y Firebase.

Reglas:
- Código limpio
- Código completo
- Sin explicaciones
- Sin markdown`,
    prompt
  );
}

// ARQUITECTO
async function arquitectoAI(prompt) {
  return await preguntar(
    `Eres arquitecto de software.

Define:
- pantallas
- flujo
- base de datos

No código.`,
    prompt
  );
}

// ANALISTA
async function analistaAI(prompt) {
  return await preguntar(
    `Eres analista senior.

Analiza:
- mejora idea
- agrega funciones
- detecta errores

No código.`,
    prompt
  );
}

module.exports = {
  preguntar,
  devAI,
  arquitectoAI,
  analistaAI
};