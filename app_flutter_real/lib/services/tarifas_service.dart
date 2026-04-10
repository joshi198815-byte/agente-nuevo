class TarifasService {

  double calcular(String pais, double base) {

    if (pais == "usa") return base * 1.2;
    if (pais == "mexico") return base * 1.1;

    return base;
  }
}