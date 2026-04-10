class AppLang {

  static Map<String, Map<String, String>> data = {

    "es": {
      "login": "Iniciar sesión",
      "register": "Registrarse",
      "email": "Correo",
      "password": "Contraseña",
      "home": "Inicio",
    },

    "en": {
      "login": "Login",
      "register": "Register",
      "email": "Email",
      "password": "Password",
      "home": "Home",
    }

  };

  static String t(String key, String lang) {
    return data[lang]?[key] ?? key;
  }
}