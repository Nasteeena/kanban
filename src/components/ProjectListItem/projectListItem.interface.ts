import { projectItemProps } from '@/interfaces/projectItem.interface';

export interface projectListItemProps {
    appearance?: 'main' | 'sidebar';
    classname?: string;
    item: projectItemProps,
    hoveredElementId?: string, 
    setHoveredElementId?: (id: string | undefined) => void,
    deleteItem?: (id: string) => Promise<void>,
    loading: boolean
}
