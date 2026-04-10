const { guardarArchivo } = require("./builder");

// 👥 MODELO DE ROL
function crearModeloRol() {
  const codigo = `
class Rol {
  final String tipo; // cliente, conductor, admin

  Rol({required this.tipo});

  Map<String, dynamic> toMap() {
    return {
      "tipo": tipo,
    };
  }
}
`;

  return guardarArchivo("app_flutter_real/lib/models/rol.dart", codigo);
}

// 👥 EXTENDER USUARIO CON ROL
function actualizarUsuarioConRol() {
  const codigo = `
class UsuarioModel {
  final String uid;
  final String email;
  final String rol;

  UsuarioModel({
    required this.uid,
    required this.email,
    required this.rol,
  });

  Map<String, dynamic> toMap() {
    return {
      "uid": uid,
      "email": email,
      "rol": rol,
    };
  }
}
`;

  return guardarArchivo("app_flutter_real/lib/models/usuario.dart", codigo);
}

// 👥 PANTALLA SELECCIÓN DE ROL
function crearPantallaSeleccionRol() {
  const codigo = `
import 'package:flutter/material.dart';

class SeleccionRolScreen extends StatelessWidget {
  const SeleccionRolScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Selecciona tu rol")),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/home');
              },
              child: const Text("Cliente"),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/home');
              },
              child: const Text("Conductor"),
            ),
          ],
        ),
      ),
    );
  }
}
`;

  return guardarArchivo("app_flutter_real/lib/screens/rol.dart", codigo);
}

module.exports = {
  crearModeloRol,
  actualizarUsuarioConRol,
  crearPantallaSeleccionRol
};