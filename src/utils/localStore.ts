const setToLocal = (key: string, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocal = (key: string) => {
    const res = localStorage.getItem(key);
    if (res) {
        return JSON.parse(res);
    }
    return null;
};

export { setToLocal, getFromLocal };