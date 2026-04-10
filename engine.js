const { analistaAI, arquitectoAI, devAI } = require("./modules/ai");
const { seleccionarProyecto, getProyectoActual, actualizarProyecto } = require("./modules/project");
const { guardarArchivo, rutaPantalla } = require("./modules/builder");
const { generarPromptUI } = require("./modules/ui");

const { crearLogin, crearRegister } = require("./modules/auth");
const { crearServicioDB, crearModeloUsuario } = require("./modules/database");
const { setupFirebaseCompleto } = require("./modules/firebase");
const { ejecutarApp } = require("./modules/runner");
const { corregirError } = require("./modules/fixer");

const { crearModeloRol, actualizarUsuarioConRol, crearPantallaSeleccionRol } = require("./modules/roles");
const { crearModeloPedido, crearPantallaPedido } = require("./modules/uber");
const { crearPanelAdmin } = require("./modules/panel");

const maps = require("./modules/maps");

const { optimizarApp } = require("./modules/optimizer");

const {
  crearModeloViajero,
  crearModeloEnvio,
  crearMatchingService,
  crearPantallaViaje,
  crearPantallaEnvio
} = require("./modules/iway");

const {
  crearArchivosIdioma,
  crearLangController,
  crearSelectorIdioma
} = require("./modules/lang");

const {
  crearModeloPago,
  crearServicioPago,
  crearPantallaPago
} = require("./modules/payments");

const {
  crearAuthService,
  crearAuthController,
  crearHomeProtegido,
  crearAuthWrapper
} = require("./modules/authpro");

const { crearStripeService, crearPantallaStripe } = require("./modules/stripe");

const {
  crearModeloPais,
  crearConfigPais,
  crearTarifasService,
  crearSelectorPais
} = require("./modules/country");

const {
  crearDashboardService,
  crearDashboardScreen
} = require("./modules/dashboard");

// 🧠 SISTEMAS
const memory = require('./memory/memory.manager');
const versionManager = require('./memory/version.manager');
const rollback = require('./memory/rollback.manager');
const autonomy = require('./memory/autonomy.manager');
const executor = require('./memory/autonomy.executor');
const human = require('./memory/humanizer');
const thinker = require('./memory/thinker');

// ================= DETECTOR =================
function detectarTipoApp(idea) {
  if (idea.includes("viajero") || idea.includes("envio") || idea.includes("iway")) return "iway";
  if (idea.includes("uber") || idea.includes("pedido")) return "uber";
  return "general";
}

// ================= CONSTRUCTOR =================
function construirApp(tipo) {

  crearLogin();
  crearRegister();
  crearServicioDB();
  crearModeloUsuario();

  crearAuthService();
  crearAuthController();
  crearHomeProtegido();
  crearAuthWrapper();

  crearStripeService();
  crearPantallaStripe();

  crearModeloPais();
  crearConfigPais();
  crearTarifasService();
  crearSelectorPais();

  crearDashboardService();
  crearDashboardScreen();

  crearModeloRol();
  actualizarUsuarioConRol();
  crearPantallaSeleccionRol();

  maps.crearMapa();
  maps.crearTracking();
  maps.crearMapaTracking();
  maps.crearGPSReal();
  maps.crearTrackingPro();

  crearPanelAdmin();

  crearModeloPedido();
  crearPantallaPedido();

  crearModeloPago();
  crearServicioPago();
  crearPantallaPago();

  crearArchivosIdioma();
  crearLangController();
  crearSelectorIdioma();

  if (tipo === "iway") {
    crearModeloViajero();
    crearModeloEnvio();
    crearMatchingService();
    crearPantallaViaje();
    crearPantallaEnvio();
  }
}

// ================= CEREBRO =================
async function procesar(texto, userId = "default") {

  texto = texto.toLowerCase().trim();

  const context = await memory.loadMemory(userId, texto);

  const pensamiento = thinker.pensarAntes(texto);

  let respuesta = "";

  if (texto.startsWith("proyecto")) {
    const nombre = texto.replace("proyecto", "").trim();
    respuesta = seleccionarProyecto(nombre).mensaje;
  }

  else {

    let proyecto = getProyectoActual();

    // 🔥 AUTO CREAR PROYECTO
    if (!proyecto) {
      const nombreAuto = "proyecto_" + Date.now();
      seleccionarProyecto(nombreAuto);
      proyecto = getProyectoActual();
    }

    if (!proyecto.idea) {
      actualizarProyecto({ idea: texto });
    }

    // ROLLBACK
    if (texto.startsWith("rollback")) {
      const proyectoNombre = proyecto.nombre || "default";
      const version = texto.replace("rollback", "").trim();

      if (!version) {
        const versions = rollback.listVersions(proyectoNombre);
        respuesta = "📂 Versiones:\n" + versions.join("\n");
      } else {
        const result = rollback.restoreVersion(proyectoNombre, version);
        respuesta = result.message;
      }
    }

    // AUTONOMÍA
    else if (
      texto.includes("quiero") ||
      texto.includes("necesito") ||
      texto.includes("crea") ||
      texto.includes("haz")
    ) {

      const acciones = autonomy.analizarIntencion(texto);
      const plan = autonomy.planAutonomo(acciones);

      const contexto = {
        construirApp,
        crearPagos: () => {
          crearModeloPago();
          crearServicioPago();
          crearPantallaPago();
        },
        crearMapas: () => {
          maps.crearMapa();
          maps.crearTracking();
          maps.crearMapaTracking();
        },
        crearIdioma: () => {
          crearArchivosIdioma();
          crearLangController();
          crearSelectorIdioma();
        }
      };

      const logs = await executor.ejecutarPlan(plan, contexto);

      respuesta = logs.join("\n");
    }

    else {
      respuesta = "Cuéntame más detalles de la app que quieres y la construimos juntos.";
    }
  }

  // 🧠 agregar pensamiento
  respuesta = `
🧠 Pensé esto:
${pensamiento.join("\n")}

${respuesta}
`;

  // 🧠 humanizar
  respuesta = human.humanizarRespuesta(texto, respuesta);

  await memory.saveMemory(userId, texto, respuesta);

  return respuesta;
}

module.exports = { procesar };