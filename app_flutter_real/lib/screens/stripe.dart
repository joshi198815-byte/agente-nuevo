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
          child: const Text("Pagar $100"),
        ),
      ),
    );
  }
}