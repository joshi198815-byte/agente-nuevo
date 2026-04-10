const { guardarArchivo } = require("./builder");

// 🔐 SERVICIO AUTH PRO
function crearAuthService() {
  const codigo = `
import 'package:firebase_auth/firebase_auth.dart';

class AuthService {
  final FirebaseAuth _auth = FirebaseAuth.instance;

  User? get usuario => _auth.currentUser;

  Stream<User?> get authState => _auth.authStateChanges();

  Future<void> logout() async {
    await _auth.signOut();
  }
}
`;

  return guardarArchivo("app_flutter_real/lib/services/auth_service.dart", codigo);
}

// 🔐 CONTROLADOR DE SESIÓN
function crearAuthController() {
  const codigo = `
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
`;

  return guardarArchivo("app_flutter_real/lib/controllers/auth_controller.dart", codigo);
}

// 🔐 HOME PROTEGIDO
function crearHomeProtegido() {
  const codigo = `
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../controllers/auth_controller.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthController>(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text("Home"),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              auth.logout();
            },
          )
        ],
      ),
      body: const Center(
        child: Text("Bienvenido"),
      ),
    );
  }
}
`;

  return guardarArchivo("app_flutter_real/lib/screens/home.dart", codigo);
}

// 🔐 WRAPPER DE SESIÓN
function crearAuthWrapper() {
  const codigo = `
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../controllers/auth_controller.dart';
import 'login.dart';
import 'home.dart';

class AuthWrapper extends StatelessWidget {
  const AuthWrapper({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthController>(context);

    if (auth.isLoading) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }

    return auth.isLogged ? const HomeScreen() : const LoginScreen();
  }
}
`;

  return guardarArchivo("app_flutter_real/lib/screens/auth_wrapper.dart", codigo);
}

module.exports = {
  crearAuthService,
  crearAuthController,
  crearHomeProtegido,
  crearAuthWrapper
};