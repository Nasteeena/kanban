import { useState } from 'react';

const useHover = () => {
	const [hoveredElementId, setHoveredElementId] = useState<string | null>(null);

	const elementEnter = (elementId: string) => {
		if (setHoveredElementId && elementId) {
			setHoveredElementId(elementId);
		}
	};

	const elementLeave = (elementId: string) => {
		if (setHoveredElementId && elementId) {
			setHoveredElementId(null);
		}
	};

	return {
		elementLeave,
		elementEnter,
		hoveredElementId,
	};
};

export default useHover;
