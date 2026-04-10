const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const { procesar } = require("../engine");

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// 🧠 memoria simple por usuario
const conversaciones = {};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/chat", async (req, res) => {

  const { mensaje, userId = "web-user" } = req.body;

  if (!conversaciones[userId]) {
    conversaciones[userId] = [];
  }

  conversaciones[userId].push({ role: "user", content: mensaje });

  try {

    const respuesta = await procesar(mensaje, userId);

    conversaciones[userId].push({ role: "bot", content: respuesta });

    res.json({
      respuesta,
      historial: conversaciones[userId]
    });

  } catch (err) {
    console.log(err);
    res.json({ respuesta: "❌ Error en el agente" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🌐 Web funcionando en puerto " + PORT);
});