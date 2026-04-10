const { guardarArchivo } = require("./builder");

// 🌐 ARCHIVO DE TRADUCCIONES
function crearArchivosIdioma() {
  const codigo = `
class AppLang {

  static Map<String, Map<String, String>> data = {

    "es": {
      "login": "Iniciar sesión",
      "register": "Registrarse",
      "email": "Correo",
      "password": "Contraseña",
      "home": "Inicio",
    },

    "en": {
      "login": "Login",
      "register": "Register",
      "email": "Email",
      "password": "Password",
      "home": "Home",
    }

  };

  static String t(String key, String lang) {
    return data[lang]?[key] ?? key;
  }
}
`;

  return guardarArchivo("app_flutter_real/lib/lang/app_lang.dart", codigo);
}

// 🌐 CONTROLADOR DE IDIOMA
function crearLangController() {
  const codigo = `
import 'package:flutter/material.dart';

class LangController extends ChangeNotifier {
  String _lang = "es";

  String get lang => _lang;

  void cambiarIdioma(String nuevo) {
    _lang = nuevo;
    notifyListeners();
  }
}
`;

  return guardarArchivo("app_flutter_real/lib/lang/lang_controller.dart", codigo);
}

// 🌐 WIDGET SELECTOR
function crearSelectorIdioma() {
  const codigo = `
import 'package:flutter/material.dart';
import '../lang/lang_controller.dart';
import 'package:provider/provider.dart';

class SelectorIdioma extends StatelessWidget {
  const SelectorIdioma({super.key});

  @override
  Widget build(BuildContext context) {
    final lang = Provider.of<LangController>(context);

    return DropdownButton<String>(
      value: lang.lang,
      items: const [
        DropdownMenuItem(value: "es", child: Text("Español")),
        DropdownMenuItem(value: "en", child: Text("English")),
      ],
      onChanged: (value) {
        lang.cambiarIdioma(value!);
      },
    );
  }
}
`;

  return guardarArchivo("app_flutter_real/lib/widgets/lang_selector.dart", codigo);
}

module.exports = {
  crearArchivosIdioma,
  crearLangController,
  crearSelectorIdioma
};