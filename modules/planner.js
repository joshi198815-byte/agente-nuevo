function generarPlan(texto) {

    if (texto.includes("uber")) {
        return `
📱 PLAN DE APP TIPO UBER

1. 👤 Autenticación
- Registro
- Login

2. 🚗 Módulo Conductor
- Aceptar viajes
- Estado disponible

3. 🙋 Módulo Cliente
- Solicitar viaje
- Ver conductor

4. 🗺️ Mapas
- Ubicación en tiempo real
- Rutas

5. 💳 Pagos
- Tarjeta
- Efectivo

6. 🧠 Backend
- API
- Base de datos

7. 🛠️ Panel Admin
- Control de usuarios
- Reportes
`;
    }

    return "Estoy creando el plan de tu app...";
}

module.exports = { generarPlan };