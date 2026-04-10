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