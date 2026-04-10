const { guardarArchivo } = require("./builder");

// ✈️ MODELO VIAJERO
function crearModeloViajero() {
  const codigo = `
class Viajero {
  final String id;
  final String origen;
  final String destino;
  final DateTime fecha;

  Viajero({
    required this.id,
    required this.origen,
    required this.destino,
    required this.fecha,
  });

  Map<String, dynamic> toMap() {
    return {
      "origen": origen,
      "destino": destino,
      "fecha": fecha.toString(),
    };
  }
}
`;

  return guardarArchivo("app_flutter_real/lib/models/viajero.dart", codigo);
}

// 📦 MODELO ENVÍO
function crearModeloEnvio() {
  const codigo = `
class Envio {
  final String id;
  final String origen;
  final String destino;
  final String estado;

  Envio({
    required this.id,
    required this.origen,
    required this.destino,
    required this.estado,
  });

  Map<String, dynamic> toMap() {
    return {
      "origen": origen,
      "destino": destino,
      "estado": estado,
    };
  }
}
`;

  return guardarArchivo("app_flutter_real/lib/models/envio.dart", codigo);
}

// 🔍 MATCHING AUTOMÁTICO
function crearMatchingService() {
  const codigo = `
import 'package:cloud_firestore/cloud_firestore.dart';

class MatchingService {
  final FirebaseFirestore _db = FirebaseFirestore.instance;

  // 🔥 buscar viajeros compatibles
  Future<List<QueryDocumentSnapshot>> buscarMatches(String origen, String destino) async {

    final result = await _db.collection("viajes")
      .where("origen", isEqualTo: origen)
      .where("destino", isEqualTo: destino)
      .get();

    return result.docs;
  }
}
`;

  return guardarArchivo("app_flutter_real/lib/services/matching_service.dart", codigo);
}

// 📱 PANTALLA PUBLICAR VIAJE
function crearPantallaViaje() {
  const codigo = `
import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class PublicarViajeScreen extends StatefulWidget {
  const PublicarViajeScreen({super.key});

  @override
  State<PublicarViajeScreen> createState() => _PublicarViajeScreenState();
}

class _PublicarViajeScreenState extends State<PublicarViajeScreen> {

  final origen = TextEditingController();
  final destino = TextEditingController();

  Future<void> publicar() async {
    await FirebaseFirestore.instance.collection("viajes").add({
      "origen": origen.text,
      "destino": destino.text,
    });

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text("Viaje publicado")),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Publicar viaje")),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            TextField(controller: origen, decoration: const InputDecoration(labelText: "Origen")),
            TextField(controller: destino, decoration: const InputDecoration(labelText: "Destino")),
            const SizedBox(height: 20),
            ElevatedButton(onPressed: publicar, child: const Text("Publicar"))
          ],
        ),
      ),
    );
  }
}
`;

  return guardarArchivo("app_flutter_real/lib/screens/viaje.dart", codigo);
}

// 📦 PANTALLA CREAR ENVÍO
function crearPantallaEnvio() {
  const codigo = `
import 'package:flutter/material.dart';
import '../services/matching_service.dart';

class EnvioScreen extends StatefulWidget {
  const EnvioScreen({super.key});

  @override
  State<EnvioScreen> createState() => _EnvioScreenState();
}

class _EnvioScreenState extends State<EnvioScreen> {

  final origen = TextEditingController();
  final destino = TextEditingController();

  final matching = MatchingService();

  Future<void> buscar() async {
    final resultados = await matching.buscarMatches(
      origen.text,
      destino.text,
    );

    print("Matches encontrados: \${resultados.length}");
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Enviar paquete")),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            TextField(controller: origen, decoration: const InputDecoration(labelText: "Origen")),
            TextField(controller: destino, decoration: const InputDecoration(labelText: "Destino")),
            const SizedBox(height: 20),
            ElevatedButton(onPressed: buscar, child: const Text("Buscar viajero"))
          ],
        ),
      ),
    );
  }
}
`;

  return guardarArchivo("app_flutter_real/lib/screens/envio.dart", codigo);
}

module.exports = {
  crearModeloViajero,
  crearModeloEnvio,
  crearMatchingService,
  crearPantallaViaje,
  crearPantallaEnvio
};