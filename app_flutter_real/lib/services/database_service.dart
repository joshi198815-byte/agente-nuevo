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