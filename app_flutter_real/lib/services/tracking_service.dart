import 'package:cloud_firestore/cloud_firestore.dart';

class TrackingService {
  final FirebaseFirestore _db = FirebaseFirestore.instance;

  Future<void> actualizarUbicacion(String pedidoId, double lat, double lng) async {
    await _db.collection("tracking").doc(pedidoId).set({
      "lat": lat,
      "lng": lng,
      "timestamp": DateTime.now(),
    });
  }

  Stream<DocumentSnapshot> escucharUbicacion(String pedidoId) {
    return _db.collection("tracking").doc(pedidoId).snapshots();
  }
}