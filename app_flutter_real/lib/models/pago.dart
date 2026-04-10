class Pago {
  final String id;
  final double monto;
  final String metodo;
  final String estado;

  Pago({
    required this.id,
    required this.monto,
    required this.metodo,
    required this.estado,
  });

  Map<String, dynamic> toMap() {
    return {
      "monto": monto,
      "metodo": metodo,
      "estado": estado,
    };
  }
}