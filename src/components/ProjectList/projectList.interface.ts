import { projectItemProps } from '@/interfaces/projectItem.interface';
import { projectItemView } from '@/interfaces/elementView.interface';

export interface projectListComponentProps {
    projectList: projectItemProps[]
    getData?: () => Promise<void>;
    id: string | null;
    appearance: projectItemView['appearance'],
    openModal?: boolean,
    setOpen?: () => void,
    loading: boolean,
    hoveredElementId: string, 
    setHoveredElementId?: (id: string | undefined) => void,
    deleteItem?: (id: string) => Promise<void>,
}