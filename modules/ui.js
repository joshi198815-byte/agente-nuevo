// 🔥 CONFIGURACIÓN DE UI GLOBAL

function getUIConfig() {
  return {
    colores: {
      primary: "#0A84FF",
      secondary: "#30D158",
      background: "#F2F2F7",
      text: "#1C1C1E",
      error: "#FF3B30"
    },
    estilo: `
- Usa Scaffold limpio
- AppBar moderno
- Padding 20
- Inputs con borde redondeado
- Botones grandes y elegantes
- Diseño minimalista tipo app premium
`
  };
}

// 🔥 GENERAR PROMPT UI PARA IA
function generarPromptUI(pantalla, idea) {
  const ui = getUIConfig();

  return `
Crea una pantalla Flutter llamada ${pantalla}.

Contexto de la app:
${idea}

Diseño:
${ui.estilo}

Colores:
Primary: ${ui.colores.primary}
Background: ${ui.colores.background}
Texto: ${ui.colores.text}

Requisitos:
- Código completo
- Pantalla funcional
- Buen diseño visual
- Sin explicaciones
- Sin markdown
`;
}

module.exports = {
  generarPromptUI
};