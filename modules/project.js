const { cargarDB, guardarDB, obtenerProyecto } = require("./memory");

let proyectoActual = null;

// 🔥 CAMBIAR O CREAR PROYECTO
function seleccionarProyecto(nombre) {
  const db = cargarDB();

  const proyecto = obtenerProyecto(db, nombre);

  proyectoActual = nombre;

  guardarDB(db);

  return {
    mensaje: `📁 Proyecto activo: ${nombre}`,
    proyecto
  };
}

// 🔥 OBTENER PROYECTO ACTUAL
function getProyectoActual() {
  if (!proyectoActual) {
    return null;
  }

  const db = cargarDB();
  return db[proyectoActual];
}

// 🔥 GUARDAR CAMBIOS EN PROYECTO
function actualizarProyecto(data) {
  if (!proyectoActual) return;

  const db = cargarDB();

  db[proyectoActual] = {
    ...db[proyectoActual],
    ...data
  };

  guardarDB(db);
}

module.exports = {
  seleccionarProyecto,
  getProyectoActual,
  actualizarProyecto
};