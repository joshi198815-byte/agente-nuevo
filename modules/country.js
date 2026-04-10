const { guardarArchivo } = require("./builder");

// 🌎 MODELO PAÍS
function crearModeloPais() {
  const codigo = `
class Pais {
  final String nombre;
  final String moneda;
  final String simbolo;

  Pais({
    required this.nombre,
    required this.moneda,
    required this.simbolo,
  });
}
`;

  return guardarArchivo("app_flutter_real/lib/models/pais.dart", codigo);
}

// 🌎 CONFIG GLOBAL
function crearConfigPais() {
  const codigo = `
class ConfigPais {

  static Map<String, Map<String, String>> data = {
    "guatemala": {
      "moneda": "GTQ",
      "simbolo": "Q"
    },
    "usa": {
      "moneda": "USD",
      "simbolo": "\$"
    },
    "mexico": {
      "moneda": "MXN",
      "simbolo": "\$"
    }
  };

}
`;

  return guardarArchivo("app_flutter_real/lib/config/pais_config.dart", codigo);
}

// 🌎 SERVICIO DE TARIFAS
function crearTarifasService() {
  const codigo = `
class TarifasService {

  double calcular(String pais, double base) {

    if (pais == "usa") return base * 1.2;
    if (pais == "mexico") return base * 1.1;

    return base;
  }
}
`;

  return guardarArchivo("app_flutter_real/lib/services/tarifas_service.dart", codigo);
}

// 🌎 SELECTOR DE PAÍS
function crearSelectorPais() {
  const codigo = `
import 'package:flutter/material.dart';

class SelectorPais extends StatelessWidget {
  const SelectorPais({super.key});

  @override
  Widget build(BuildContext context) {
    return DropdownButton<String>(
      items: const [
        DropdownMenuItem(value: "guatemala", child: Text("Guatemala")),
        DropdownMenuItem(value: "usa", child: Text("USA")),
        DropdownMenuItem(value: "mexico", child: Text("México")),
      ],
      onChanged: (value) {
        print("País seleccionado: \$value");
      },
    );
  }
}
`;

  return guardarArchivo("app_flutter_real/lib/widgets/pais_selector.dart", codigo);
}

module.exports = {
  crearModeloPais,
  crearConfigPais,
  crearTarifasService,
  crearSelectorPais
};