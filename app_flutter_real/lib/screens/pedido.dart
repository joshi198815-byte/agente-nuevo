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