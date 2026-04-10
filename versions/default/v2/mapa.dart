import 'package:flutter/material.dart';

class MapaScreen extends StatefulWidget {
  @override
  _MapaScreenState createState() => _MapaScreenState();
}

class _MapaScreenState extends State<MapaScreen> {
  final TextEditingController origenController = TextEditingController();
  final TextEditingController destinoController = TextEditingController();

  @override
  void dispose() {
    origenController.dispose();
    destinoController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    const primaryColor = Color(0xFF0A84FF);
    const backgroundColor = Color(0xFFF2F2F7);
    const textColor = Color(0xFF1C1C1E);

    return Scaffold(
      backgroundColor: backgroundColor,
      appBar: AppBar(
        backgroundColor: backgroundColor,
        elevation: 0,
        centerTitle: true,
        title: Text(
          "Mapa",
          style: TextStyle(
            color: textColor,
            fontWeight: FontWeight.bold,
            fontSize: 22,
            letterSpacing: 0.5,
          ),
        ),
        actions: [
          IconButton(
            icon: Icon(Icons.account_circle_rounded, color: primaryColor, size: 28),
            onPressed: () {},
            splashRadius: 24,
          ),
        ],
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(
            bottom: Radius.circular(24),
          ),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Material(
              elevation: 2,
              borderRadius: BorderRadius.circular(18),
              color: Colors.white,
              child: TextField(
                controller: origenController,
                style: TextStyle(color: textColor, fontSize: 16),
                decoration: InputDecoration(
                  hintText: "¿Dónde estás?",
                  hintStyle: TextStyle(color: textColor.withOpacity(0.5)),
                  prefixIcon: Icon(Icons.my_location, color: primaryColor),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(18),
                    borderSide: BorderSide.none,
                  ),
                  filled: true,
                  fillColor: Colors.white,
                  contentPadding: EdgeInsets.symmetric(vertical: 18, horizontal: 16),
                ),
              ),
            ),
            SizedBox(height: 16),
            Material(
              elevation: 2,
              borderRadius: BorderRadius.circular(18),
              color: Colors.white,
              child: TextField(
                controller: destinoController,
                style: TextStyle(color: textColor, fontSize: 16),
                decoration: InputDecoration(
                  hintText: "¿A dónde vas?",
                  hintStyle: TextStyle(color: textColor.withOpacity(0.5)),
                  prefixIcon: Icon(Icons.place, color: primaryColor),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(18),
                    borderSide: BorderSide.none,
                  ),
                  filled: true,
                  fillColor: Colors.white,
                  contentPadding: EdgeInsets.symmetric(vertical: 18, horizontal: 16),
                ),
              ),
            ),
            SizedBox(height: 28),
            ElevatedButton(
              onPressed: () {},
              style: ElevatedButton.styleFrom(
                backgroundColor: primaryColor,
                foregroundColor: Colors.white,
                elevation: 2,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(18),
                ),
                padding: EdgeInsets.symmetric(vertical: 20),
                textStyle: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  letterSpacing: 0.5,
                ),
              ),
              child: Text("Buscar viaje"),
            ),
            SizedBox(height: 24),
            Expanded(
              child: Container(
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(24),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black12,
                      blurRadius: 12,
                      offset: Offset(0, 6),
                    ),
                  ],
                ),
                child: Center(
                  child: Icon(
                    Icons.map_rounded,
                    color: primaryColor.withOpacity(0.25),
                    size: 120,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}