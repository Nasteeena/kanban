import { ListSubheader, Skeleton } from '@mui/material';
import { SIDEBAR } from '@/utils/constants';
import ProjectListItem from '../ProjectListItem/ProjectListItem';
import AddElement from '@/components/AddElement/AddElement';
import { projectListComponentProps } from './projectList.interface';
import { projectItemProps } from '@/interfaces/projectItem.interface';
import cn from 'classnames';
import styles from './projectList.module.css';

const ProjectList = ({ 
    setOpen, 
    projectList,
    getData, 
    id, 
    appearance,
    openModal,
    loading,
    hoveredElementId, 
    setHoveredElementId,
    deleteItem
} : projectListComponentProps) => {
    return (
        <ul className={cn(styles.projectList, {
            [styles['projectListMain']] : appearance === 'main',
            [styles['projectListSidebar']] : appearance === 'sidebar'
        })}>
            <ListSubheader sx={{display: 'flex', backgroundColor: 'transparent', alignItems: 'center'}} component="div">
                {SIDEBAR.SUB_HEADER}
                <AddElement
                    setOpen={setOpen} 
                    openModal={openModal} 
                    add={getData} 
                    path={`tasks/${id}/children`}
                />
            </ListSubheader>
            {loading && <Skeleton height={100} width={200}/>}
            {projectList.map((item: projectItemProps) => (
                    <ProjectListItem
                        key={item.id}
                        deleteItem={deleteItem} 
                        hoveredElementId={hoveredElementId} 
                        setHoveredElementId={setHoveredElementId} 
                        item={item} 
                        appearance={appearance}
                        loading={loading}
                    />
            ))}
        </ul>
    );
};

export default ProjectList;
