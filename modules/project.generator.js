const fs = require("fs");
const path = require("path");

function crearProyectoBase(nombre = "mi_app") {

  const base = path.join(process.cwd(), "output", nombre);

  const estructura = [
    "lib",
    "lib/screens",
    "lib/services",
    "lib/models",
    "lib/controllers",
    "lib/widgets",
    "assets",
    "assets/images"
  ];

  estructura.forEach(dir => {
    const ruta = path.join(base, dir);
    fs.mkdirSync(ruta, { recursive: true });
  });

  // archivo principal
  fs.writeFileSync(path.join(base, "lib/main.dart"), `
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'App AI',
      home: Scaffold(
        appBar: AppBar(title: Text('App AI')),
        body: Center(child: Text('Bienvenido')),
      ),
    );
  }
}
  `);

  return base;
}

module.exports = { crearProyectoBase };