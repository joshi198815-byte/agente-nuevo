function pensarAntes(texto) {

    const pasos = [];

    if (texto.includes("app")) {
        pasos.push("Detecté que quieres crear una app");
    }

    if (texto.includes("pago")) {
        pasos.push("Detecté sistema de pagos");
    }

    if (texto.includes("mapa")) {
        pasos.push("Detecté uso de mapas");
    }

    return pasos;
}

module.exports = {
    pensarAntes
};