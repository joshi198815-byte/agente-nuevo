const rollback = require('./memory/rollback.manager');

const proyecto = "app1";

// listar versiones
const versions = rollback.listVersions(proyecto);
console.log("Versiones:", versions);

// restaurar última
if (versions.length > 0) {
    const last = versions[versions.length - 1];

    const result = rollback.restoreVersion(proyecto, last);

    console.log(result);
}