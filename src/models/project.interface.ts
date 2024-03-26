import { projectItemView } from '@/models/elementView.interface';

export interface ListItemProps {
	title: string;
	id: string;
	tasks?: { id: string; title: string }[];
}

export interface ProjectListProps {
	appearance: projectItemView['appearance'];
	loading: boolean;
	projectList?: ListItemProps[];
	deleteItem?: (id: string) => Promise<void>;
	classname?: string;
}

export interface ProjectListItemProps extends ProjectListProps {
	item: ListItemProps;
}
