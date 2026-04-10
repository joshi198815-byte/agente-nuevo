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
        print("País seleccionado: $value");
      },
    );
  }
}