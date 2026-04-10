const fs = require("fs");
const path = require("path");
const { devAI } = require("./ai");
const { guardarArchivo } = require("./builder");

// 🔍 DETECTAR ARCHIVO CON ERROR
function detectarArchivo(error) {
  const match = error.match(/lib\/[^\s]+\.dart/);
  return match ? match[0] : null;
}

// 🔥 CORREGIR ERROR
async function corregirError(error) {
  const archivo = detectarArchivo(error);

  if (!archivo) return "No se detectó archivo";

  const ruta = path.join("app_flutter_real", archivo);

  const codigo = fs.readFileSync(ruta, "utf-8");

  const solucion = await devAI(`
Corrige este código Flutter sin eliminar funcionalidad.

ERROR:
${error}

CÓDIGO:
${codigo}
`);

  guardarArchivo(ruta, solucion);

  return `🔧 Corregido: ${archivo}`;
}

module.exports = {
  corregirError
};