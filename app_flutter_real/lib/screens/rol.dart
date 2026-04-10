import 'package:flutter/material.dart';

class SeleccionRolScreen extends StatelessWidget {
  const SeleccionRolScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Selecciona tu rol")),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/home');
              },
              child: const Text("Cliente"),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/home');
              },
              child: const Text("Conductor"),
            ),
          ],
        ),
      ),
    );
  }
}