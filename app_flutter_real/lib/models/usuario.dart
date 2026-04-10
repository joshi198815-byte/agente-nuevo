class UsuarioModel {
  final String uid;
  final String email;
  final String rol;

  UsuarioModel({
    required this.uid,
    required this.email,
    required this.rol,
  });

  Map<String, dynamic> toMap() {
    return {
      "uid": uid,
      "email": email,
      "rol": rol,
    };
  }
}