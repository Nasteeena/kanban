import { Box, Typography, InputAdornment, Input, IconButton } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { ChangeEvent } from 'react';

interface MainHeadingProps {
	inputValue: string;
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
	userName: string | null;
	children: React.ReactNode;
	openSettings: () => void;
}

const MainHeading = ({
	inputValue,
	handleChange,
	userName,
	children,
	openSettings,
}: MainHeadingProps) => {
	return (
		<Box
			sx={{
				background: '#48409E',
				color: 'white',
				display: 'flex',
				justifyContent: 'space-between',
				padding: '15px',
				alignItems: 'center',
				marginBottom: '20px',
			}}
		>
			<Input
				value={inputValue ? inputValue[0].toUpperCase() + inputValue.slice(1) : ''}
				onChange={handleChange}
				placeholder="Search Project"
				sx={{
					background: '#FFFFFF',
					borderRadius: '5px',
					padding: '6px',
					outline: 'none',
				}}
				startAdornment={
					<InputAdornment position="start">
						<SearchRoundedIcon />
					</InputAdornment>
				}
			/>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
				<Typography variant="h6">{userName}</Typography>
				<IconButton onClick={openSettings}>
					<AccountCircleRoundedIcon />
				</IconButton>
			</Box>
			{children}
		</Box>
	);
};

export default MainHeading;
