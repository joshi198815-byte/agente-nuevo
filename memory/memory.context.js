function buildContext(memory, input) {
    if (!memory) {
        return {
            history: [],
            preferences: {},
            projects: []
        };
    }

    return {
        history: memory.history || [],
        preferences: memory.preferences || {},
        projects: memory.projects || [],
        lastInput: input
    };
}

function updateContext(memory, input, output) {
    if (!memory) {
        memory = {
            history: [],
            preferences: {},
            projects: []
        };
    }

    memory.history.push({
        input,
        output,
        date: new Date().toISOString()
    });

    if (memory.history.length > 20) {
        memory.history.shift();
    }

    return memory;
}

module.exports = {
    buildContext,
    updateContext
};