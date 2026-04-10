function getRelevantContext(history, input) {

    if (!history || history.length === 0) return [];

    input = input.toLowerCase();

    // buscar coincidencias simples
    const relevantes = history.filter(item =>
        item.input.toLowerCase().includes(input) ||
        input.includes(item.input.toLowerCase())
    );

    // si no hay coincidencias, usar últimos 5
    if (relevantes.length === 0) {
        return history.slice(-5);
    }

    return relevantes.slice(-5);
}

module.exports = {
    getRelevantContext
};