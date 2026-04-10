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