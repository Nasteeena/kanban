import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const useProjectList = () => {
	const { projects } = useSelector((state: RootState) => state.projects);
	const { columns } = useSelector((state: RootState) => state.columns);

	return {
		projects,
		columns,
	};
};

export default useProjectList;
