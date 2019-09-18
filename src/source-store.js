let store = {};

export const setSource = (path, source) => {
    store[path] = source;
};

export const flushSources = () => {
    const ret = store;
    store = {};
    return ret;
};