const { guardarArchivo } = require("./builder");

// 💳 MODELO DE PAGO
function crearModeloPago() {
  const codigo = `
class Pago {
  final String id;
  final double monto;
  final String metodo;
  final String estado;

  Pago({
    required this.id,
    required this.monto,
    required this.metodo,
    required this.estado,
  });

  Map<String, dynamic> toMap() {
    return {
      "monto": monto,
      "metodo": metodo,
      "estado": estado,
    };
  }
}
`;

  return guardarArchivo("app_flutter_real/lib/models/pago.dart", codigo);
}

// 💳 SERVICIO DE PAGOS
function crearServicioPago() {
  const codigo = `
import 'package:cloud_firestore/cloud_firestore.dart';

class PagoService {
  final FirebaseFirestore _db = FirebaseFirestore.instance;

  Future<void> crearPago(Map<String, dynamic> data) async {
    await _db.collection("pagos").add(data);
  }
}
`;

  return guardarArchivo("app_flutter_real/lib/services/pago_service.dart", codigo);
}

// 💳 PANTALLA DE PAGO
function crearPantallaPago() {
  const codigo = `
import 'package:flutter/material.dart';
import '../services/pago_service.dart';

class PagoScreen extends StatefulWidget {
  const PagoScreen({super.key});

  @override
  State<PagoScreen> createState() => _PagoScreenState();
}

class _PagoScreenState extends State<PagoScreen> {

  final monto = TextEditingController();
  final pagoService = PagoService();

  Future<void> pagar() async {
    await pagoService.crearPago({
      "monto": double.parse(monto.text),
      "metodo": "contra_entrega",
      "estado": "pendiente"
    });

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text("Pago registrado")),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Pago")),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            TextField(
              controller: monto,
              decoration: const InputDecoration(labelText: "Monto"),
              keyboardType: TextInputType.number,
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: pagar,
              child: const Text("Pagar"),
            )
          ],
        ),
      ),
    );
  }
}
`;

  return guardarArchivo("app_flutter_real/lib/screens/pago.dart", codigo);
}

module.exports = {
  crearModeloPago,
  crearServicioPago,
  crearPantallaPago
};