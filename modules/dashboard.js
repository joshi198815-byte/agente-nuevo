const { guardarArchivo } = require("./builder");

// 📊 SERVICIO DASHBOARD
function crearDashboardService() {
  const codigo = `
import 'package:cloud_firestore/cloud_firestore.dart';

class DashboardService {

  final FirebaseFirestore _db = FirebaseFirestore.instance;

  Future<int> totalUsuarios() async {
    final res = await _db.collection("usuarios").get();
    return res.docs.length;
  }

  Future<int> totalPedidos() async {
    final res = await _db.collection("pedidos").get();
    return res.docs.length;
  }

  Future<int> totalPagos() async {
    final res = await _db.collection("pagos").get();
    return res.docs.length;
  }

}
`;

  return guardarArchivo("app_flutter_real/lib/services/dashboard_service.dart", codigo);
}

// 📊 PANTALLA DASHBOARD PRO
function crearDashboardScreen() {
  const codigo = `
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
`;

  return guardarArchivo("app_flutter_real/lib/screens/dashboard.dart", codigo);
}

module.exports = {
  crearDashboardService,
  crearDashboardScreen
};