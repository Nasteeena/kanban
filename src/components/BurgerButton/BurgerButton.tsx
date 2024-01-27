import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem, IconButton } from '@mui/material';
import {useState} from 'react';
import { BurgerButtonProps } from './burgerButton.interface';

const BurgerButton = ({ deleteItem } : BurgerButtonProps) => {
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
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{height: '10px'}}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button'
                }}
            >
                <MenuItem onClick={deleteItem}>Delete</MenuItem>
            </Menu>
        </div>
    );
};

export default BurgerButton;

