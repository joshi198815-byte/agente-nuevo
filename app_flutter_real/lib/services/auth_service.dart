import 'package:firebase_auth/firebase_auth.dart';

class AuthService {
  final FirebaseAuth _auth = FirebaseAuth.instance;

  User? get usuario => _auth.currentUser;

  Stream<User?> get authState => _auth.authStateChanges();

  Future<void> logout() async {
    await _auth.signOut();
  }
}