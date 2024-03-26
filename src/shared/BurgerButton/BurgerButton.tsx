import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, IconButton } from '@mui/material';
import { useState } from 'react';

interface BurgerButtonProps {
	children: React.ReactNode;
	buttonIcon: 'visible' | 'not_visible';
}

const BurgerButton = ({ children, buttonIcon }: BurgerButtonProps) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<IconButton
				onClick={handleClick}
				disableFocusRipple
				sx={{ height: '4px', width: '5px', p: '10px', m: '0 0 0 10px ' }}
			>
				{buttonIcon === 'visible' && <MoreVertIcon />}
			</IconButton>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				{children}
			</Menu>
		</div>
	);
};

export default BurgerButton;
