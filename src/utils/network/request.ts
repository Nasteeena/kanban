const handleAsyncError = async (asyncFunction: () => Promise<void>, ...args) => {
    try {
        return await asyncFunction(...args);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default handleAsyncError;