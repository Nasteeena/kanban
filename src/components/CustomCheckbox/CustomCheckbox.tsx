import { Checkbox, FormControlLabel } from '@mui/material';
import { ChangeEvent } from 'react';

interface CustomCheckBoxProps {
	value: string;
	label: string;
	handleChange: (e: ChangeEvent<HTMLInputElement>, id: string) => Promise<void>;
	checkedList: string[];
	color: string;
}

const CustomCheckBox = ({
	value,
	label,
	handleChange,
	checkedList,
	color,
}: CustomCheckBoxProps) => {
	const labelStyle: React.CSSProperties = {
		background: color,
		padding: '5px',
		borderRadius: '7px',
		width: '100px',
		textAlign: 'center',
	};

	return (
		<FormControlLabel
			control={<Checkbox />}
			value={value}
			label={<div style={labelStyle}>{label}</div>}
			checked={checkedList?.includes(value)}
			onChange={handleChange}
		/>
	);
};

export default CustomCheckBox;
