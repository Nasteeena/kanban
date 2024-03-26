// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setToLocal = (key: string, value: any) => {
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
