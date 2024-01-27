import { Box, Typography } from '@mui/material';
import { ColumnInterface } from './Column.interface';
import ButtonComponent from '../Button/Button';

const Column: React.FC<ColumnInterface> = ({ list }) => {
    return (
        <Box sx={{
            p: '10px',
            m: '10px 20px',
            backgroundColor: '#aed7e3',
            borderRadius: '5px',
            display: 'flex',
            flexDirection: 'column',
            width: '180px',
            height: 'fit-content'
        }}>
            
                    <Typography key={list.id} sx={{
                        fontWeight: 600,
                        textAlign: 'center',
                        borderBottom: '1px grey solid',
                        m: '5px'
                    }}>{list.title}</Typography>
                
            
            {/* <Box sx={{
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '10px'
                }}>
                {list && list.map(item => (
                    <Typography sx={{
                        p: '5px',
                        border: '2px solid grey',
                        borderRadius: '5px',
                        m: '5px 0',
                        width: '100%',
                        textAlign: 'center'
                    }} key={item.id}>
                        {item.title}
                    </Typography>
                ))}
            </Box> */}
            <ButtonComponent>
                Добавить новую задачу
            </ButtonComponent>
        </Box>
    );
};

export default Column;
