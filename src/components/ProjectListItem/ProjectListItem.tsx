import { ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './projectListItem.module.css';
import cn from 'classnames';
import { projectListItemProps } from './projectListItem.interface';
import BurgerButton from '@/components/BurgerButton/BurgerButton';

const ProjectListItem = ({
        item, 
        classname, 
        appearance, 
        hoveredElementId, 
        setHoveredElementId,
        deleteItem
} : projectListItemProps) => {

    const elementEnter = (elementId: string) => {
        if(setHoveredElementId && elementId) {
            setHoveredElementId(elementId);
        }
    };

    const elementLeave = (elementId: string) => {
        if(setHoveredElementId && elementId) {
            setHoveredElementId(undefined);
        }
    };

    return (
        <li
            onMouseEnter={() => elementEnter(item.id)}
            onMouseLeave={() => elementLeave(item.id)}
                className={cn(styles.listItem, classname, {
                    [styles['listItemMain']] : appearance === 'main',
                    [styles['listItemSidebar']] : appearance === 'sidebar'
                })}
                key={item.id}>
                    <Link to={`/project/${item.title}/${item.id}`}>
                        <ListItemText sx={{color: 'white', ':hover': {color: 'black'}}}>
                            {item.title}
                        </ListItemText>
                    </Link>
                    {hoveredElementId === item.id 
                        && deleteItem 
                        && 
                        <BurgerButton 
                            deleteItem={() => deleteItem(item.id)}
                    />}
        </li>
    );
};

export default ProjectListItem;

