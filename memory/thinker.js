function pensarAntes(texto) {

    const pasos = [];

    if (texto.includes("app")) {
        pasos.push("Detecté que quieres crear una app");
    }

    if (texto.includes("uber")) {
        pasos.push("Detecté tipo de app: transporte tipo Uber");
    }

    if (texto.includes("pedido")) {
        pasos.push("Detecté app de pedidos");
    }

    if (texto.includes("pago")) {
        pasos.push("Detecté sistema de pagos");
    }

    if (texto.includes("mapa") || texto.includes("gps")) {
        pasos.push("Detecté uso de mapas y geolocalización");
    }

    if (texto.includes("login") || texto.includes("usuario")) {
        pasos.push("Detecté sistema de autenticación");
    }

    if (pasos.length === 0) {
        pasos.push("Estoy analizando tu idea para entender mejor lo que necesitas");
    }

    return pasos;
}

module.exports = {
    pensarAntes
};