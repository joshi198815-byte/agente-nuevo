const { seleccionarProyecto, getProyectoActual, actualizarProyecto } = require("./modules/project");
const maps = require("./modules/maps");

const memory = require('./memory/memory.manager');
const rollback = require('./memory/rollback.manager');
const autonomy = require('./memory/autonomy.manager');
const executor = require('./memory/autonomy.executor');
const human = require('./memory/humanizer');
const thinker = require('./memory/thinker');

const { generarPlan } = require("./modules/planner");
const { crearProyectoBase } = require("./modules/project.generator");
const aiFlutter = require("./modules/ai.flutter.generator");
const fullAppAI = require("./modules/ai.fullapp.generator");
const tester = require("./modules/tester.pro");
const fixer = require("./modules/fixer.pro");
const apkBuilder = require("./modules/apk.builder");

// ================= CEREBRO =================
async function procesar(texto, userId = "default") {

  texto = texto.toLowerCase().trim();

  const context = await memory.loadMemory(userId, texto);
  const pensamiento = thinker.pensarAntes(texto);

  let respuesta = "";
  let logs = [];

  if (texto.startsWith("proyecto")) {
    const nombre = texto.replace("proyecto", "").trim();
    respuesta = seleccionarProyecto(nombre).mensaje;
  } else {

    let proyecto = getProyectoActual();

    if (!proyecto) {
      const nombreAuto = "proyecto_" + Date.now();
      seleccionarProyecto(nombreAuto);
      proyecto = getProyectoActual();
    }

    if (!proyecto.idea) {
      actualizarProyecto({ idea: texto });
    }

    // ================= CREAR APP =================
    if (texto.includes("crear app")) {
      const ruta = crearProyectoBase("app_" + Date.now());
      actualizarProyecto({ path: ruta });
      logs.push("📁 Proyecto creado en: " + ruta);
    }

    // ================= ROLLBACK =================
    if (texto.startsWith("rollback")) {

      const proyectoNombre = proyecto.nombre || "default";
      const version = texto.replace("rollback", "").trim();

      if (!version) {
        const versions = rollback.listVersions(proyectoNombre);
        logs.push("📂 Versiones:\n" + versions.join("\n"));
      } else {
        const result = rollback.restoreVersion(proyectoNombre, version);
        logs.push(result.message);
      }
    }

    // ================= AUTONOMÍA =================
    if (
      texto.includes("quiero") ||
      texto.includes("necesito") ||
      texto.includes("crea") ||
      texto.includes("haz")
    ) {

      const acciones = autonomy.analizarIntencion(texto);
      const plan = autonomy.planAutonomo(acciones);

      const contexto = {
        crearMapas: () => {
          maps.crearMapa();
          maps.crearTracking();
          maps.crearMapaTracking();
        }
      };

      const resultado = await executor.ejecutarPlan(plan, contexto);
      logs.push(...resultado);

      // IA GENERA PANTALLAS
      if (proyecto.path) {

        const idea = proyecto.idea || texto;

        if (texto.includes("login")) {
          const ruta = await aiFlutter.generarPantallaIA("login_screen", idea, proyecto.path);
          logs.push("🔥 Login IA: " + ruta);
        }

        if (texto.includes("mapa") || texto.includes("uber")) {
          const ruta = await aiFlutter.generarPantallaIA("mapa_screen", idea, proyecto.path);
          logs.push("🗺️ Mapa IA: " + ruta);
        }
      }
    }

    // ================= APP COMPLETA =================
    if (texto.includes("app completa") || texto.includes("nivel uber")) {

      if (!proyecto.path) {
        const ruta = crearProyectoBase("app_" + Date.now());
        actualizarProyecto({ path: ruta });
      }

      const idea = proyecto.idea || texto;

      const archivos = await fullAppAI.generarAppCompleta(idea, proyecto.path);

      logs.push("🚀 App completa generada");
      archivos.forEach(f => logs.push("📄 " + f));

      // TESTING
      let intentos = 0;

      while (intentos < 3) {

        const test = await tester.ejecutarFlutter(proyecto.path);

        if (test.success) {
          logs.push("✅ App sin errores");
          break;
        }

        logs.push("❌ Error → corrigiendo...");
        await fixer.corregirCodigo(test.error, []);

        intentos++;
      }
    }

    // ================= APK =================
    if (texto.includes("apk")) {

      const result = await apkBuilder.generarAPK(proyecto.path);

      if (result.success) {
        logs.push("📦 APK generado:");
        logs.push(result.apk);
      } else {
        logs.push("❌ Error APK:");
        logs.push(result.error);
      }
    }

    respuesta = logs.join("\n");
  }

  // ================= RESPUESTA =================
  respuesta = `
🧠 Pensé esto:
${pensamiento.join("\n")}

${respuesta}
`;

  const plan = generarPlan(texto);
  if (plan) respuesta += `\n\n${plan}`;

  respuesta = human.humanizarRespuesta(texto, respuesta);

  await memory.saveMemory(userId, texto, respuesta);

  return respuesta;
}

module.exports = { procesar };