import { Skeleton } from '@mui/material';
import ProjectListItem from '../ProjectListItem/ProjectListItem';
import cn from 'classnames';
import styles from './projectList.module.css';
import { ProjectListProps, ListItemProps } from '@/models/project.interface';

const ProjectList = ({ projectList, appearance, loading, deleteItem }: ProjectListProps) => {
	return (
		<ul
			className={cn(styles.projectList, {
				[styles['projectListMain']]: appearance === 'main',
				[styles['projectListSidebar']]: appearance === 'sidebar',
			})}
		>
			{loading && <Skeleton height={100} width={200} />}
			{projectList &&
				projectList.map((item: ListItemProps) => (
					<ProjectListItem
						key={item.id}
						deleteItem={deleteItem}
						item={item}
						appearance={appearance}
						loading={loading}
					/>
				))}
		</ul>
	);
};

export default ProjectList;
