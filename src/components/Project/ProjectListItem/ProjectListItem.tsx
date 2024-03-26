import { ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './projectListItem.module.css';
import cn from 'classnames';
import BurgerButton from '@/shared/BurgerButton/BurgerButton';
import { ProjectListItemProps } from '@/models/project.interface';
import { MenuItem, ListItemIcon } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import useHover from '@/hooks/useHover';

const ProjectListItem = ({ item, classname, appearance, deleteItem }: ProjectListItemProps) => {
	const { elementEnter, elementLeave, hoveredElementId } = useHover();

	return (
		<li
			onMouseEnter={() => elementEnter(item.id)}
			onMouseLeave={() => elementLeave(item.id)}
			className={cn(styles.listItem, classname, {
				[styles['listItemMain']]: appearance === 'main',
				[styles['listItemSidebar']]: appearance === 'sidebar',
			})}
			key={item.id}
		>
			<Link to={`/project/${item.title}/${item.id}`}>
				<ListItemText sx={{ color: 'white', ':hover': { color: 'black' } }}>
					{item.title}
				</ListItemText>
			</Link>
			{hoveredElementId === item.id && deleteItem && (
				<BurgerButton buttonIcon="visible">
					<MenuItem onClick={() => deleteItem(item.id)}>
						<ListItemIcon>
							<DeleteOutlineIcon fontSize="small" />
						</ListItemIcon>
						Delete
					</MenuItem>
				</BurgerButton>
			)}
		</li>
	);
};

export default ProjectListItem;
