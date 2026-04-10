const { guardarArchivo } = require("./builder");

// 🔥 SERVICIO FIRESTORE
function crearServicioDB() {
  const codigo = `
import 'package:cloud_firestore/cloud_firestore.dart';

class DatabaseService {
  final FirebaseFirestore _db = FirebaseFirestore.instance;

  // 🔥 CREAR USUARIO
  Future<void> crearUsuario(String uid, Map<String, dynamic> data) async {
    await _db.collection("usuarios").doc(uid).set(data);
  }

  // 🔥 CREAR PEDIDO (tipo Uber)
  Future<void> crearPedido(Map<String, dynamic> data) async {
    await _db.collection("pedidos").add(data);
  }

  // 🔥 OBTENER PEDIDOS
  Stream<QuerySnapshot> obtenerPedidos() {
    return _db.collection("pedidos").snapshots();
  }
}
`;

  return guardarArchivo("app_flutter_real/lib/services/database_service.dart", codigo);
}

// 🔥 MODELO DE USUARIO
function crearModeloUsuario() {
  const codigo = `
class UsuarioModel {
  final String uid;
  final String email;

  UsuarioModel({required this.uid, required this.email});

  Map<String, dynamic> toMap() {
    return {
      "uid": uid,
      "email": email,
    };
  }
}
`;

  return guardarArchivo("app_flutter_real/lib/models/usuario.dart", codigo);
}

module.exports = {
  crearServicioDB,
  crearModeloUsuario
};