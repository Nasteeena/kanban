import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from '@/store/slices/user.slice';
import { Box, Typography } from '@mui/material';
import useAuth from '@/hooks/useAuth';
import ButtonComponent from '@/components/Button/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from 'react';
import { db } from '@/firebase';
import { collection  } from 'firebase/firestore'; 
import { loadData, clearProjectListError, clearLoader } from '@/store/slices/project.slice';
import { SIDEBAR } from '@/utils/constants';
import ProjectList from '@/components/ProjectList/ProjectList';
import useProjectList from '@/hooks/useProjectList';
import dataBaseUse from '@/utils/databaseUse';

const Sidebar = () => {
    const dispatch = useDispatch();
    const { email, id } = useAuth();
    const messageRef = collection(db, `tasks/${id}/children`);
    const { projectList, loader } = useProjectList();
    const [open, setOpen] = useState<boolean>(false);
    const [hoveredElementId, setHoveredElementId] = useState(null);

    const getData = async () => {
        dispatch(clearProjectListError());
        dispatch(loadData({messageRef}))
            .then(() => {
                dispatch(clearLoader());
            });
    };

    useEffect(()=> {
        getData();
    }, []);

    const remove = () => { dispatch(removeUser()); };

    const deleteItem = async (elementId: string) => {
        await dataBaseUse.deleteFromDataBase(`tasks/${id}/children/${elementId}`);
        getData();
    };

    return ( 
        <Box sx={{display: 'flex'}}>
            <Box sx={{
                    width: '200px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    flexDirection: 'column', 
                    p: '20px 30px'
                }}>
                <Typography 
                        padding='5px' 
                        boxShadow='-2px 0px 19px 6px rgba(34, 60, 80, 0.2)' 
                        marginBottom='20px' variant="h4" 
                        color='var(--button-color)'>
                    {SIDEBAR.HEADER}
                </Typography>
                <AccountCircleIcon />
                <Typography fontSize='15px' margin='10px 0' variant="h4">{email}</Typography>
                <ProjectList 
                    setOpen={setOpen} 
                    openModal={open}
                    projectList={projectList}
                    getData={getData}
                    id={id}
                    appearance='sidebar'
                    loading={loader}
                    setHoveredElementId={setHoveredElementId}
                    hoveredElementId={hoveredElementId}
                    deleteItem={deleteItem}
                />
                <ButtonComponent 
                    style={{position: 'absolute', bottom: 10}} 
                    appearance='big' onClick={remove}>
                    Log out
                    </ButtonComponent>
            </Box>
            <Box sx={{
                    width: '100%', 
                    height: '100%', 
                    backgroundColor: '#ffebf1', 
                    boxShadow: '-9px 0px 34px 2px rgba(34, 60, 80, 0.2)'
                }}>
                <Outlet />
            </Box>
        </Box> 
    );
};

export default Sidebar;
