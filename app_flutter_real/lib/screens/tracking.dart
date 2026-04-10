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