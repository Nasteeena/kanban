import { useState } from 'react';

export default function useTitleEdit(initialValue: string) {
	const [value, setValue] = useState<string>(initialValue);

	const textChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

	return {
		value,
		setValue,
		textChange,
	};
}
