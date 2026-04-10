const fs = require("fs");

const DB_FILE = "proyectos.json";

// 🔥 CARGAR BASE DE DATOS
function cargarDB() {
  if (!fs.existsSync(DB_FILE)) return {};
  return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
}

// 🔥 GUARDAR BASE DE DATOS
function guardarDB(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

// 🔥 CREAR OBTENER PROYECTO
function obtenerProyecto(db, nombre) {
  if (!db[nombre]) {
    db[nombre] = {
      idea: "",
      plan: "",
      aprobado: false,
      pantallas: []
    };
  }
  return db[nombre];
}

module.exports = {
  cargarDB,
  guardarDB,
  obtenerProyecto
};