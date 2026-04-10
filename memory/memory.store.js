const fs = require('fs');
const path = require('path');

const MEMORY_PATH = path.join(__dirname, '../data/memory.json');

// asegurar archivo
function ensureMemoryFile() {
    if (!fs.existsSync(MEMORY_PATH)) {
        fs.writeFileSync(MEMORY_PATH, JSON.stringify({ users: {} }, null, 2));
    }
}

// leer memoria
function readMemory() {
    ensureMemoryFile();
    const data = fs.readFileSync(MEMORY_PATH);
    return JSON.parse(data);
}

// guardar memoria
function writeMemory(data) {
    fs.writeFileSync(MEMORY_PATH, JSON.stringify(data, null, 2));
}

// obtener usuario
function getUserMemory(userId) {
    const db = readMemory();
    return db.users[userId] || null;
}

// guardar usuario
function saveUserMemory(userId, memory) {
    const db = readMemory();
    db.users[userId] = memory;
    writeMemory(db);
}

module.exports = {
    getUserMemory,
    saveUserMemory
};