const { exec } = require("child_process");

// 🔥 EJECUTAR FLUTTER
function ejecutarApp() {
  return new Promise((resolve) => {
    exec("flutter run -d chrome", { cwd: "app_flutter_real" }, (error, stdout, stderr) => {
      if (error) {
        resolve(stderr);
      } else {
        resolve(null);
      }
    });
  });
}

module.exports = {
  ejecutarApp
};