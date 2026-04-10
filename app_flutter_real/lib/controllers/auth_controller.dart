import 'package:flutter/material.dart';
import '../services/auth_service.dart';

class AuthController extends ChangeNotifier {
  final AuthService _auth = AuthService();

  bool isLoading = true;

  bool get isLogged => _auth.usuario != null;

  AuthController() {
    _auth.authState.listen((user) {
      isLoading = false;
      notifyListeners();
    });
  }

  Future<void> logout() async {
    await _auth.logout();
    notifyListeners();
  }
}