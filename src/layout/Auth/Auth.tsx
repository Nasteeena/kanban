import { Outlet } from 'react-router-dom';
import { Box, CardMedia, Card  } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import authPicture from '@/assets/auth.png';

const Item = styled(Paper)(() => ({
    height: '100%',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

const Auth = () => {
    return (
        <Box 
            height="100vh" 
            display="flex"
            flexDirection={{xs: 'column', sm: 'row'}}
            alignItems={{xs: 'center', sm: 'stretch'}}
            justifyContent='center'
        >
            <Item sx={{
                width: {xs: '100%', sm: '50%'}, 
                boxShadow: 'none', 
                backgroundColor: 'var(--authBackground-color)'
            }}>
                <Card style={{
                    boxShadow: 'none', 
                    backgroundColor: 'var(--authBackground-color)'
                }}>
                    <CardMedia
                        component="img"
                        height="600"
                        image={authPicture}
                        alt="auth picture"
                        sx={{objectFit: 'contain'}}
                    />
                </Card>
            </Item>
            <Item sx={{width: {xs: '100%', sm: '50%'}, boxShadow: 'none'}}>
                <Outlet/>
            </Item>
        </Box>
    );
};

export default Auth;
