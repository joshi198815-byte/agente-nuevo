const fs = require('fs');
const path = require('path');

const BASE_PATH = path.join(__dirname, '../versions');

// listar versiones
function listVersions(projectName) {
    const projectPath = path.join(BASE_PATH, projectName);

    if (!fs.existsSync(projectPath)) return [];

    return fs.readdirSync(projectPath);
}

// restaurar versión (AHORA sí reescribe archivos)
function restoreVersion(projectName, version) {

    const versionPath = path.join(BASE_PATH, projectName, version);

    if (!fs.existsSync(versionPath)) {
        return {
            success: false,
            message: "❌ Versión no encontrada"
        };
    }

    const files = fs.readdirSync(versionPath);

    for (const file of files) {
        const content = fs.readFileSync(path.join(versionPath, file), 'utf-8');

        // 🔥 ruta destino real (ajústala si quieres)
        const destino = path.join(__dirname, '../generated', file);

        // crear carpeta si no existe
        const dir = path.dirname(destino);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(destino, content);
    }

    return {
        success: true,
        message: `✅ Versión ${version} restaurada correctamente`
    };
}

module.exports = {
    listVersions,
    restoreVersion
};