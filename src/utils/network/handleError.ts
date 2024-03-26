/* eslint-disable @typescript-eslint/no-explicit-any */

const handleAsyncError = async (
	asyncFunction: (...args: any[]) => Promise<void>,
	...args: any[]
) => {
	try {
		return await asyncFunction(...args);
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export default handleAsyncError;
