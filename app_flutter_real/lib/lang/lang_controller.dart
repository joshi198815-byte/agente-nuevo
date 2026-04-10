import 'package:flutter/material.dart';

class LangController extends ChangeNotifier {
  String _lang = "es";

  String get lang => _lang;

  void cambiarIdioma(String nuevo) {
    _lang = nuevo;
    notifyListeners();
  }
}