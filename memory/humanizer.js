function humanizarRespuesta(textoUsuario, respuestaBase) {

    return `👨‍💻 Soy NEXUS.

Entendí lo que me dijiste:
"${textoUsuario}"

👉 Esto es lo que hice o pensé:

${respuestaBase}

Si quieres, puedo mejorarlo, hacerlo más profesional o agregar funciones específicas.`;
}

module.exports = {
    humanizarRespuesta
};