class Rol {
  final String tipo; // cliente, conductor, admin

  Rol({required this.tipo});

  Map<String, dynamic> toMap() {
    return {
      "tipo": tipo,
    };
  }
}