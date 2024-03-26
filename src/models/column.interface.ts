import { ListItemProps } from './project.interface';
import { MouseEventHandler } from 'react';

export interface ColumnContainerProps {
	columnName: string;
	columnId: string;
}

export interface ColumnTaskProps {
	task: ListItemProps;
	value: string;
	textChange: () => void;
	handleEditTaskSubmit: (e: React.MouseEvent<HTMLButtonElement>, taskId: string) => void;
	openTaskId: string | null;
	setValue: (value: string) => void;
	setOpenTaskId: (value: string | null) => void;
	openCard: () => void;
	showContextMenu: (value: MouseEventHandler<HTMLDivElement>) => void;
	contextMenu: string;
	children: React.ReactNode;
	tags: string[];
}

export interface ColumnTaskCardProps {
	open: boolean;
	setOpen: (value: boolean) => void;
	title: string;
	handleCheckedChange: (e: React.ChangeEvent<HTMLInputElement>, id: string) => Promise<void>;
	checkedList: string[];
	deleteTask: (value: ListItemProps) => void;
	itemId: string;
	returnTask: (e: MouseEventHandler<HTMLButtonElement>) => void;
}
