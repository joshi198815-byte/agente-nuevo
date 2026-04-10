const fs = require("fs");
const path = require("path");
const { devAI } = require("./ai");
const { guardarArchivo } = require("./builder");

// 🤖 ANALIZAR Y MEJORAR ARCHIVO
async function optimizarArchivo(ruta) {
  if (!fs.existsSync(ruta)) return;

  const codigo = fs.readFileSync(ruta, "utf-8");

  const mejorado = await devAI(`
Mejora este código Flutter:

- hazlo más limpio
- mejora UI
- optimiza rendimiento
- no elimines funcionalidad

CÓDIGO:
${codigo}
`);

  guardarArchivo(ruta, mejorado);

  return ruta;
}

// 🔥 OPTIMIZAR TODA LA APP
async function optimizarApp() {
  const base = "app_flutter_real/lib";

  function recorrer(dir) {
    const archivos = fs.readdirSync(dir);

    archivos.forEach(async (archivo) => {
      const full = path.join(dir, archivo);

      if (fs.lstatSync(full).isDirectory()) {
        recorrer(full);
      } else if (full.endsWith(".dart")) {
        await optimizarArchivo(full);
      }
    });
  }

  recorrer(base);

  return "🤖 App optimizada automáticamente";
}

module.exports = {
  optimizarApp
};