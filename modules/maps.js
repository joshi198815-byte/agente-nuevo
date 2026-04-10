const { guardarArchivo } = require("./builder");

// 🗺️ MAPA BASE
function crearMapa() {
  const codigo = `
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class MapaScreen extends StatefulWidget {
  const MapaScreen({super.key});

  @override
  State<MapaScreen> createState() => _MapaScreenState();
}

class _MapaScreenState extends State<MapaScreen> {

  late GoogleMapController mapController;

  final LatLng _center = const LatLng(14.6349, -90.5069);

  void _onMapCreated(GoogleMapController controller) {
    mapController = controller;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Mapa")),
      body: GoogleMap(
        onMapCreated: _onMapCreated,
        initialCameraPosition: CameraPosition(
          target: _center,
          zoom: 14.0,
        ),
      ),
    );
  }
}
`;

  return guardarArchivo("app_flutter_real/lib/screens/mapa.dart", codigo);
}

// 📡 TRACKING
function crearTracking() {
  const codigo = `
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
`;

  return guardarArchivo("app_flutter_real/lib/services/tracking_service.dart", codigo);
}

// 🚗 TRACKING EN MAPA
function crearMapaTracking() {
  const codigo = `
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import '../services/tracking_service.dart';

class TrackingScreen extends StatefulWidget {
  const TrackingScreen({super.key});

  @override
  State<TrackingScreen> createState() => _TrackingScreenState();
}

class _TrackingScreenState extends State<TrackingScreen> {

  final TrackingService tracking = TrackingService();

  LatLng posicion = const LatLng(14.6349, -90.5069);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Tracking")),
      body: StreamBuilder(
        stream: tracking.escucharUbicacion("pedido1"),
        builder: (context, snapshot) {

          if (snapshot.hasData && snapshot.data!.exists) {
            final data = snapshot.data!.data() as Map<String, dynamic>;

            posicion = LatLng(data["lat"], data["lng"]);
          }

          return GoogleMap(
            initialCameraPosition: CameraPosition(
              target: posicion,
              zoom: 15,
            ),
            markers: {
              Marker(
                markerId: const MarkerId("ubicacion"),
                position: posicion,
              )
            },
          );
        },
      ),
    );
  }
}
`;

  return guardarArchivo("app_flutter_real/lib/screens/tracking.dart", codigo);
}

// 📡 GPS REAL
function crearGPSReal() {
  const codigo = `
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
`;

  return guardarArchivo("app_flutter_real/lib/services/gps_service.dart", codigo);
}

// 🔥 EXPORT ÚNICO
module.exports = {
  crearMapa,
  crearTracking,
  crearMapaTracking,
  crearGPSReal,
  crearTrackingPro
};
// 🛣️ RUTA + TRACKING PRO (tipo Uber)
function crearTrackingPro() {
  const codigo = `
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import '../services/tracking_service.dart';

class TrackingProScreen extends StatefulWidget {
  const TrackingProScreen({super.key});

  @override
  State<TrackingProScreen> createState() => _TrackingProScreenState();
}

class _TrackingProScreenState extends State<TrackingProScreen> {

  final TrackingService tracking = TrackingService();

  LatLng posicion = const LatLng(14.6349, -90.5069);

  Set<Polyline> rutas = {};
  Set<Marker> markers = {};

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Tracking Pro")),
      body: StreamBuilder(
        stream: tracking.escucharUbicacion("pedido1"),
        builder: (context, snapshot) {

          if (snapshot.hasData && snapshot.data!.exists) {
            final data = snapshot.data!.data() as Map<String, dynamic>;

            final nuevaPos = LatLng(data["lat"], data["lng"]);

            // 🔥 actualizar marcador
            markers = {
              Marker(
                markerId: const MarkerId("usuario"),
                position: nuevaPos,
              )
            };

            // 🔥 ruta simple (línea)
            rutas = {
              Polyline(
                polylineId: const PolylineId("ruta"),
                points: [posicion, nuevaPos],
                width: 5,
              )
            };

            posicion = nuevaPos;
          }

          return GoogleMap(
            initialCameraPosition: CameraPosition(
              target: posicion,
              zoom: 15,
            ),
            markers: markers,
            polylines: rutas,
          );
        },
      ),
    );
  }
}
`;

  return guardarArchivo("app_flutter_real/lib/screens/tracking_pro.dart", codigo);
}