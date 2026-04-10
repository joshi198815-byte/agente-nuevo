import 'package:cloud_firestore/cloud_firestore.dart';

class PagoService {
  final FirebaseFirestore _db = FirebaseFirestore.instance;

  Future<void> crearPago(Map<String, dynamic> data) async {
    await _db.collection("pagos").add(data);
  }
}