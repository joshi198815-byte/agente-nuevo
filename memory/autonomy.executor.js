async function ejecutarPlan(plan, contexto) {

    const logs = [];

    for (const paso of plan) {

        try {

            let resultado = await ejecutarPaso(paso, contexto);

            logs.push(`✅ ${paso}`);

            // validación simple
            if (!resultado) {
                throw new Error("Paso falló");
            }

        } catch (err) {

            logs.push(`⚠️ Error en ${paso}, reintentando...`);

            try {
                await ejecutarPaso(paso, contexto);
                logs.push(`🔁 Reintento exitoso: ${paso}`);
            } catch (e) {
                logs.push(`❌ Falló definitivamente: ${paso}`);
            }
        }
    }

    return logs;
}

// ejecutor de cada acción
async function ejecutarPaso(paso, ctx) {

    switch (paso) {

        case "crear_base":
            ctx.construirApp("general");
            return true;

        case "crear_uber":
            ctx.construirApp("uber");
            return true;

        case "crear_iway":
            ctx.construirApp("iway");
            return true;

        case "crear_pagos":
            ctx.crearPagos();
            return true;

        case "crear_mapas":
            ctx.crearMapas();
            return true;

        case "crear_idioma":
            ctx.crearIdioma();
            return true;

        default:
            return false;
    }
}

module.exports = {
    ejecutarPlan
};