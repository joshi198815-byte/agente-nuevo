require("dotenv").config();
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const { procesar } = require("./engine");

const client = new Client({
  authStrategy: new LocalAuth()
});

const MI_NUMERO = "50230972335@c.us";

let procesando = false;

client.on("qr", (qr) => {
  console.log("📲 Escanea el QR:");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("🟢 WhatsApp conectado");
});

client.on("message_create", async (msg) => {

  const esMiChat = msg.from === MI_NUMERO || msg.to === MI_NUMERO;
  if (!esMiChat) return;

  if (msg.fromMe && msg.body.includes("👨‍💻")) return;

  if (procesando) return;

  if (!msg.body || msg.body.trim() === "") return;

  const texto = msg.body.trim();

  procesando = true;

  let respuesta;

  try {
    respuesta = await procesar(texto, MI_NUMERO);
  } catch (error) {
    console.log(error);
    respuesta = "❌ Error interno";
  }

  await msg.reply(respuesta);

  procesando = false;
});

client.initialize();