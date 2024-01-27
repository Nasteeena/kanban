import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const useProjectList = () => {
    const { 
        projectList, 
        projectListError, 
        loader, 
    } = useSelector((state: RootState) => state.project);

    return {
        projectList,
        projectListError,
        loader,
    };
};

export default useProjectList;