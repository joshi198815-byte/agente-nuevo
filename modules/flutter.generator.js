const fs = require("fs");
const path = require("path");

function crearPantalla(nombre, contenido, proyectoPath) {

  const ruta = path.join(proyectoPath, "lib", "screens", `${nombre}.dart`);

  fs.writeFileSync(ruta, contenido);

  return ruta;
}

// 🔥 LOGIN PROFESIONAL
function generarLoginScreen() {
  return `
import 'package:flutter/material.dart';

class LoginScreen extends StatelessWidget {
  final TextEditingController email = TextEditingController();
  final TextEditingController password = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Login')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(controller: email, decoration: InputDecoration(labelText: 'Email')),
            TextField(controller: password, decoration: InputDecoration(labelText: 'Password'), obscureText: true),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {},
              child: Text('Login'),
            )
          ],
        ),
      ),
    );
  }
}
`;
}

// 🔥 HOME SCREEN
function generarHomeScreen() {
  return `
import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Inicio')),
      body: Center(
        child: Text('Bienvenido a tu App AI'),
      ),
    );
  }
}
`;
}

// 🔥 MAPA (BASE PARA UBER)
function generarMapaScreen() {
  return `
import 'package:flutter/material.dart';

class MapaScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Mapa')),
      body: Center(
        child: Text('Aquí irá el mapa en tiempo real'),
      ),
    );
  }
}
`;
}

module.exports = {
  crearPantalla,
  generarLoginScreen,
  generarHomeScreen,
  generarMapaScreen
};