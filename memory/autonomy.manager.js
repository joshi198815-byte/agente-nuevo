function analizarIntencion(texto) {

    texto = texto.toLowerCase();

    const acciones = [];

    if (texto.includes("uber") || texto.includes("taxi")) {
        acciones.push("tipo:uber");
    }

    if (texto.includes("envio") || texto.includes("viajero")) {
        acciones.push("tipo:iway");
    }

    if (texto.includes("pago") || texto.includes("tarjeta")) {
        acciones.push("payments");
    }

    if (texto.includes("mapa") || texto.includes("gps")) {
        acciones.push("maps");
    }

    if (texto.includes("idioma")) {
        acciones.push("lang");
    }

    return acciones;
}

// decidir qué hacer automáticamente
function planAutonomo(acciones) {

    const plan = [];

    acciones.forEach(a => {

        if (a === "tipo:uber") {
            plan.push("crear_base");
            plan.push("crear_uber");
        }

        if (a === "tipo:iway") {
            plan.push("crear_base");
            plan.push("crear_iway");
        }

        if (a === "payments") {
            plan.push("crear_pagos");
        }

        if (a === "maps") {
            plan.push("crear_mapas");
        }

        if (a === "lang") {
            plan.push("crear_idioma");
        }

    });

    return plan;
}

module.exports = {
    analizarIntencion,
    planAutonomo
};