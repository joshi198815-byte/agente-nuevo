const { exec } = require("child_process");
const path = require("path");

function generarAPK(proyectoPath) {

  return new Promise((resolve) => {

    const comando = `
      cd ${proyectoPath} &&
      flutter pub get &&
      flutter build apk --release
    `;

    exec(comando, (error, stdout, stderr) => {

      if (error) {
        return resolve({
          success: false,
          error: stderr
        });
      }

      const apkPath = path.join(
        proyectoPath,
        "build",
        "app",
        "outputs",
        "flutter-apk",
        "app-release.apk"
      );

      resolve({
        success: true,
        apk: apkPath,
        output: stdout
      });

    });

  });
}

module.exports = { generarAPK };