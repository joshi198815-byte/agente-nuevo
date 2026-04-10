const { guardarArchivo } = require("./builder");

// 💳 SERVICIO STRIPE (BASE)
function crearStripeService() {
  const codigo = `
class StripeService {

  Future<void> pagar(double monto) async {
    // 🔴 Aquí se conectará Stripe real
    print("Procesando pago: \$monto");
  }

}
`;

  return guardarArchivo("app_flutter_real/lib/services/stripe_service.dart", codigo);
}

// 💳 UI DE PAGO REAL
function crearPantallaStripe() {
  const codigo = `
import 'package:flutter/material.dart';
import '../services/stripe_service.dart';

class StripeScreen extends StatelessWidget {
  const StripeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final stripe = StripeService();

    return Scaffold(
      appBar: AppBar(title: const Text("Pago con tarjeta")),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            stripe.pagar(100);
          },
          child: const Text("Pagar \$100"),
        ),
      ),
    );
  }
}
`;

  return guardarArchivo("app_flutter_real/lib/screens/stripe.dart", codigo);
}

module.exports = {
  crearStripeService,
  crearPantallaStripe
};