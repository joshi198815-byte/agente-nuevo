const { guardarArchivo } = require("./builder");

// 🚗 CREAR MODELO PEDIDO
function crearModeloPedido() {
  const codigo = `
class Pedido {
  final String id;
  final String origen;
  final String destino;
  final String estado;

  Pedido({
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

  return guardarArchivo("app_flutter_real/lib/models/pedido.dart", codigo);
}

// 🚗 PANTALLA CREAR PEDIDO
function crearPantallaPedido() {
  const codigo = `
import 'package:flutter/material.dart';
import '../services/database_service.dart';

class PedidoScreen extends StatefulWidget {
  const PedidoScreen({super.key});

  @override
  State<PedidoScreen> createState() => _PedidoScreenState();
}

class _PedidoScreenState extends State<PedidoScreen> {

  final origen = TextEditingController();
  final destino = TextEditingController();

  final db = DatabaseService();

  Future<void> crearPedido() async {
    await db.crearPedido({
      "origen": origen.text,
      "destino": destino.text,
      "estado": "pendiente"
    });

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text("Pedido creado")),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Nuevo Pedido")),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            TextField(controller: origen, decoration: const InputDecoration(labelText: "Origen")),
            TextField(controller: destino, decoration: const InputDecoration(labelText: "Destino")),
            const SizedBox(height: 20),
            ElevatedButton(onPressed: crearPedido, child: const Text("Crear Pedido"))
          ],
        ),
      ),
    );
  }
}
`;

  return guardarArchivo("app_flutter_real/lib/screens/pedido.dart", codigo);
}

module.exports = {
  crearModeloPedido,
  crearPantallaPedido
};