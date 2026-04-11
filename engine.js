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
const { generarPlan } = require("./modules/planner");
const { crearProyectoBase } = require("./modules/project.generator");
const flutter = require("./modules/flutter.generator");
const aiFlutter = require("./modules/ai.flutter.generator");

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
      if (texto.includes("crear app")) {
  const ruta = crearProyectoBase("app_" + Date.now());
  respuesta = "📁 Proyecto creado en: " + ruta;
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

      // 🔥 GENERACIÓN REAL DE PANTALLAS
if (proyecto && proyecto.path) {

  if (texto.includes("login")) {
    const ruta = flutter.crearPantalla(
      "login_screen",
      flutter.generarLoginScreen(),
      proyecto.path
    );
    logs.push("📱 Login creado: " + ruta);
  }

  if (texto.includes("home")) {
    const ruta = flutter.crearPantalla(
      "home_screen",
      flutter.generarHomeScreen(),
      proyecto.path
    );
    logs.push("📱 Home creado: " + ruta);
  }

  if (texto.includes("mapa") || texto.includes("uber")) {
    const ruta = flutter.crearPantalla(
      "mapa_screen",
      flutter.generarMapaScreen(),
      proyecto.path
    );
    logs.push("🗺️ Mapa creado: " + ruta);
  }
    // 🔥 IA GENERA CÓDIGO REAL
if (proyecto && proyecto.path) {

  const idea = proyecto.idea || texto;

  if (texto.includes("login")) {
    const ruta = await aiFlutter.generarPantallaIA(
      "login_screen",
      idea,
      proyecto.path
    );
    logs.push("🔥 IA creó login profesional: " + ruta);
  }

  if (texto.includes("home")) {
    const ruta = await aiFlutter.generarPantallaIA(
      "home_screen",
      idea,
      proyecto.path
    );
    logs.push("🔥 IA creó home profesional: " + ruta);
  }

  if (texto.includes("mapa") || texto.includes("uber")) {
    const ruta = await aiFlutter.generarPantallaIA(
      "mapa_screen",
      idea,
      proyecto.path
    );
    logs.push("🔥 IA creó mapa profesional: " + ruta);
  }

 
}
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
   
// 🧠 PLAN INTELIGENTE (NUEVO)
const plan = generarPlan(texto);

if (plan) {
  respuesta += `\n\n${plan}`;
}

  // 🧠 humanizar
  respuesta = human.humanizarRespuesta(texto, respuesta);

  await memory.saveMemory(userId, texto, respuesta);

  return respuesta;
}

module.exports = { procesar };