const fs = require("fs");

// 🔥 CONFIGURAR DEPENDENCIAS
function configurarDependencias() {
  const ruta = "app_flutter_real/pubspec.yaml";

  let contenido = fs.readFileSync(ruta, "utf-8");

  if (!contenido.includes("firebase_core")) {
    contenido = contenido.replace(
      "dependencies:",
      `dependencies:
  firebase_core: ^2.0.0
  firebase_auth: ^4.0.0
  cloud_firestore: ^4.0.0`
    );

    fs.writeFileSync(ruta, contenido);
  }

  return "📦 Dependencias Firebase agregadas";
}

// 🔥 CONFIGURAR MAIN.DART
function configurarMain() {
  const ruta = "app_flutter_real/lib/main.dart";

  const codigo = `
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'screens/login.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      initialRoute: '/login',
      routes: {
        '/login': (context) => const LoginScreen(),
      },
    );
  }
}
`;

  fs.writeFileSync(ruta, codigo);

  return "🔥 Firebase inicializado en main.dart";
}

// 🔥 SETUP COMPLETO
function setupFirebaseCompleto() {
  configurarDependencias();
  configurarMain();

  return `🔥 Firebase listo

Pasos manuales:
1. Crear proyecto en Firebase
2. Descargar google-services.json
3. Colocarlo en android/app/
4. Ejecutar flutter pub get`;
}

module.exports = {
  setupFirebaseCompleto
};