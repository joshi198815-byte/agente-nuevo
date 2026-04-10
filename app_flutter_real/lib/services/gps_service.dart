import 'package:geolocator/geolocator.dart';
import '../services/tracking_service.dart';

class GPSService {
  final TrackingService tracking = TrackingService();

  Future<void> iniciarTracking(String pedidoId) async {

    LocationPermission permiso = await Geolocator.requestPermission();

    if (permiso == LocationPermission.denied) return;

    Geolocator.getPositionStream().listen((Position posicion) {
      tracking.actualizarUbicacion(
        pedidoId,
        posicion.latitude,
        posicion.longitude,
      );
    });
  }
}