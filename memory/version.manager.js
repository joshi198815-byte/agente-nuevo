const fs = require('fs');
const path = require('path');

const BASE_PATH = path.join(__dirname, '../versions');

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

// obtener siguiente versión
function getNextVersion(projectName) {
    const projectPath = path.join(BASE_PATH, projectName);
    ensureDir(projectPath);

    const versions = fs.readdirSync(projectPath);
    return `v${versions.length + 1}`;
}

// guardar versión
function saveVersion(projectName, files) {
    const version = getNextVersion(projectName);

    const versionPath = path.join(BASE_PATH, projectName, version);
    ensureDir(versionPath);

    for (const file of files) {
        const filePath = path.join(versionPath, file.name);
        fs.writeFileSync(filePath, file.content);
    }

    return version;
}

module.exports = {
    saveVersion
};