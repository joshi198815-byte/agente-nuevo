import 'package:cloud_firestore/cloud_firestore.dart';

class DashboardService {

  final FirebaseFirestore _db = FirebaseFirestore.instance;

  Future<int> totalUsuarios() async {
    final res = await _db.collection("usuarios").get();
    return res.docs.length;
  }

  Future<int> totalPedidos() async {
    final res = await _db.collection("pedidos").get();
    return res.docs.length;
  }

  Future<int> totalPagos() async {
    final res = await _db.collection("pagos").get();
    return res.docs.length;
  }

}