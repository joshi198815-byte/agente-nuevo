import 'package:flutter/material.dart';
import '../services/dashboard_service.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {

  final dashboard = DashboardService();

  int usuarios = 0;
  int pedidos = 0;
  int pagos = 0;

  @override
  void initState() {
    super.initState();
    cargarDatos();
  }

  Future<void> cargarDatos() async {
    usuarios = await dashboard.totalUsuarios();
    pedidos = await dashboard.totalPedidos();
    pagos = await dashboard.totalPagos();

    setState(() {});
  }

  Widget card(String titulo, int valor) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            Text(titulo, style: const TextStyle(fontSize: 18)),
            Text(valor.toString(), style: const TextStyle(fontSize: 24)),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Dashboard Pro")),
      body: GridView.count(
        crossAxisCount: 2,
        children: [
          card("Usuarios", usuarios),
          card("Pedidos", pedidos),
          card("Pagos", pagos),
        ],
      ),
    );
  }
}