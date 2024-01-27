import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Typography, Box } from '@mui/material';
import { useEffect } from 'react';
import Column from '@/components/Column/Column';
import { db } from '@/firebase';
import { collection  } from 'firebase/firestore'; 
import useAuth from '@/hooks/useAuth';
import { loadData, clearProjectListError, clearLoader } from '@/store/slices/project.slice';
import useProjectList from '@/hooks/useProjectList';
// import { DocumentReference, CollectionReference } from '@firebase/firestore-types';

const Table = () => {
    const { projectId, title } = useParams();
    const { id } = useAuth();
    const dispatch = useDispatch();
    const { projectList } = useProjectList();
    const messageRef = collection(db, `tasks/${id}/children/${projectId}/columns`) ;
    const listFiltered = projectList.find(item => item.id === projectId)?.columns;

    const getData = async () => {
        dispatch(clearProjectListError());
        if (!listFiltered) {
            dispatch(loadData({messageRef, typeOfList: 'columns', projectId}))
                .then(() => {
                    dispatch(clearLoader());
                });
        }
    };

    useEffect(()=> {
        getData();
    }, [ projectId, projectList ]);

    return (
            <Box sx={{m: '20px', height: '100vh'}}>
                <Typography sx={{
                            m: '20px',
                            fontSize: '1.5rem',
                            color: '#7F265B'
                        }}> Project {title}
                        </Typography>
                        <Box sx={{display: 'flex'}}>
                            {listFiltered && listFiltered.map((item) => (
                                <Column key={item.id} list={item}/>
                            ))}
                        </Box>
            </Box>
    );
};

export default Table;