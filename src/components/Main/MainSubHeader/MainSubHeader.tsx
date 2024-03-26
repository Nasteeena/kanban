import { Box, Typography, Skeleton } from '@mui/material';
import headerImage from '../../../assets/header.png';
import Header from '@/shared/Header/Header';
import styles from './mainSubHeader.module.css';
import { ListItemProps } from '@/models/project.interface';

interface MainSubHeaderProps {
	userName: string | null;
	loading: boolean;
	projectList: ListItemProps[];
}

const MainSubHeader = ({ userName, loading, projectList }: MainSubHeaderProps) => {
	return (
		<div className={styles.main__container}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
				}}
			>
				<Header tag={{ tag: 'h2' }}>Hi, {userName}</Header>
				{loading ? (
					<Skeleton variant="rectangular" width={500} height={20} />
				) : projectList?.length ? (
					<Typography>
						You have {projectList.length} {projectList.length > 1 ? 'projects' : 'project'} to do
					</Typography>
				) : (
					'You don`t have any projects yet. Add a new one to start working'
				)}
			</Box>
			<Box component="img" src={headerImage} alt="Header Image" sx={{ height: '85px' }}></Box>
		</div>
	);
};

export default MainSubHeader;
