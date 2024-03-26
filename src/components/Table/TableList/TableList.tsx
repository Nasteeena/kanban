import { Box } from '@mui/material';
import ColumnContainer from '@/containers/Column/ColumnContainer';
import { ListItemProps } from '@/models/project.interface';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { DropResult } from '@hello-pangea/dnd';

interface TableListProps {
	children: React.ReactNode;
	columns: ListItemProps[];
	handleDragDrop: (result: DropResult) => Promise<void>;
}

const TableList = ({ columns, children, handleDragDrop }: TableListProps) => {
	return (
		<Box sx={{ display: 'flex', gap: '15px' }}>
			<DragDropContext onDragEnd={handleDragDrop}>
				<Droppable droppableId="ROOT" direction="horizontal" type="group">
					{(provided) => (
						<div {...provided.droppableProps} ref={provided.innerRef} style={{ display: 'flex' }}>
							{columns &&
								columns.map((item: ListItemProps, index: number) => (
									<Draggable draggableId={item.id} key={item.id} index={index}>
										{(provided) => (
											<div
												{...provided.dragHandleProps}
												{...provided.draggableProps}
												ref={provided.innerRef}
											>
												<ColumnContainer columnName={item.title} columnId={item.id} />
											</div>
										)}
									</Draggable>
								))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
			{children}
		</Box>
	);
};

export default TableList;
