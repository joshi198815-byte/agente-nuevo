class Pedido {
  final String id;
  final String origen;
  final String destino;
  final String estado;

  Pedido({
    required this.id,
    required this.origen,
    required this.destino,
    required this.estado,
  });

  Map<String, dynamic> toMap() {
    return {
      "origen": origen,
      "destino": destino,
      "estado": estado,
    };
  }
}