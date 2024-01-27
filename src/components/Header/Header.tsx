import { Box, Typography, InputAdornment, Input, IconButton } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { headerProps } from './header.interface';
import { useState } from 'react';
import SettingsModal from '../SettingsModal/SettingsModal';

const Header = ({ 
    inputValue, 
    handleChange, 
    userName 
} : headerProps) => {
    const [open, setOpen] = useState(false);

    const openSettings = () => {
        setOpen(true)
    }

    return (
        <Box sx={{
                background: '#48409E', 
                color: 'white', 
                display: 'flex',
                justifyContent: 'space-between',
                padding: '15px',
                alignItems: 'center',
                marginBottom: '20px'
            }}>
                    <Input 
                        value={inputValue ? inputValue[0].toUpperCase() + inputValue.slice(1) : ''}
                        onChange={handleChange}
                        placeholder='Search Project'
                        sx={{
                        background: '#FFFFFF',
                        borderRadius: '5px',
                        padding: '6px',
                        outline: 'none'
                        }} 
                        startAdornment={
                            <InputAdornment position='start'>
                                    <SearchRoundedIcon />
                            </InputAdornment>
                        }
                    />
            <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                <Typography variant='h6'>{userName}</Typography>
                <IconButton onClick={openSettings}>
                    <AccountCircleRoundedIcon/>
                </IconButton>
            </Box>
            {open && <SettingsModal open={open} setOpen={setOpen}/>}
        </Box>
    );
};

export default Header;
