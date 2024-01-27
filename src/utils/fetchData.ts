import { loadData, clearProjectListError, clearLoader } from '@/store/slices/project.slice';
import { useDispatch } from 'react-redux';

const fetchData = async (messageRef, typeOfList, projectId) => {
    const dispatch = useDispatch();
    
    dispatch(clearProjectListError());
    dispatch(loadData({messageRef, typeOfList, projectId}))
        .then(() => {
            dispatch(clearLoader());
        });
};

export default fetchData