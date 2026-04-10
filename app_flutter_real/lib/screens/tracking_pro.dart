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