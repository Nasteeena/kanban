import { Box } from '@mui/material';

const ColumnList = ({ children }: { children: React.ReactNode }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				padding: '10px',
			}}
		>
			{children}
		</Box>
	);
};

export default ColumnList;
