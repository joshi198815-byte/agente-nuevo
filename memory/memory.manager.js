const store = require('./memory.store');
const contextBuilder = require('./memory.context');
const smart = require('./memory.smart');

async function loadMemory(userId, input) {
    const memory = store.getUserMemory(userId);

    const baseContext = contextBuilder.buildContext(memory, input);

    const relevantHistory = smart.getRelevantContext(
        baseContext.history,
        input
    );

    return {
        ...baseContext,
        history: relevantHistory
    };
}

async function saveMemory(userId, input, output) {
    let memory = store.getUserMemory(userId);

    memory = contextBuilder.updateContext(memory, input, output);

    store.saveUserMemory(userId, memory);
}

module.exports = {
    loadMemory,
    saveMemory
};