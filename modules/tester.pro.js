const { exec } = require("child_process");

function ejecutarFlutter(proyectoPath) {
  return new Promise((resolve) => {

    exec(`cd ${proyectoPath} && flutter analyze`, (error, stdout, stderr) => {

      if (error) {
        resolve({
          success: false,
          error: stderr || stdout
        });
      } else {
        resolve({
          success: true,
          output: stdout
        });
      }

    });

  });
}

module.exports = { ejecutarFlutter };