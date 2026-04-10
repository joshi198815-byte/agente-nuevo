const { guardarArchivo } = require("./builder");

// 📊 PANEL ADMIN WEB
function crearPanelAdmin() {
  const codigo = `
import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class AdminPanel extends StatelessWidget {
  const AdminPanel({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Panel Admin")),
      body: StreamBuilder<QuerySnapshot>(
        stream: FirebaseFirestore.instance.collection("pedidos").snapshots(),
        builder: (context, snapshot) {
          if (!snapshot.hasData) {
            return const Center(child: CircularProgressIndicator());
          }

          final pedidos = snapshot.data!.docs;

          return ListView.builder(
            itemCount: pedidos.length,
            itemBuilder: (context, index) {
              final data = pedidos[index];

              return ListTile(
                title: Text("Origen: \${data["origen"]}"),
                subtitle: Text("Destino: \${data["destino"]}"),
                trailing: Text(data["estado"]),
              );
            },
          );
        },
      ),
    );
  }
}
`;

  return guardarArchivo("app_flutter_real/lib/screens/admin_panel.dart", codigo);
}

module.exports = {
  crearPanelAdmin
};