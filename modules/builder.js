const fs = require("fs");
const path = require("path");

// 🔥 LIMPIAR CÓDIGO IA
function limpiarCodigo(texto) {
  return texto
    .replace(/```dart/g, "")
    .replace(/```/g, "")
    .replace(/¡Por supuesto!.*?\n/g, "")
    .replace(/Aquí tienes.*?\n/g, "")
    .trim();
}

// 🔥 BACKUP AUTOMÁTICO
function backupArchivo(ruta) {
  if (fs.existsSync(ruta)) {
    fs.copyFileSync(ruta, ruta + ".bak");
  }
}

// 🔥 GUARDAR ARCHIVO
function guardarArchivo(ruta, contenido) {
  const limpio = limpiarCodigo(contenido);

  backupArchivo(ruta);

  fs.mkdirSync(path.dirname(ruta), { recursive: true });

  fs.writeFileSync(ruta, limpio);

  return ruta;
}

// 🔥 RUTA BASE FLUTTER
function rutaPantalla(nombre) {
  return `app_flutter_real/lib/screens/${nombre}.dart`;
}

module.exports = {
  guardarArchivo,
  rutaPantalla
};