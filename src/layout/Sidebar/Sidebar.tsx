import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import SidebarContainer from '@/containers/Sidebar/SidebarContainer';

const Sidebar = () => {
	return (
		<Box sx={{ display: 'flex' }}>
			<SidebarContainer />
			<Box
				sx={{
					width: '100%',
					height: '100%',
					backgroundColor: '#ffebf1',
					boxShadow: '-9px 0px 34px 2px rgba(34, 60, 80, 0.2)',
					overflow: 'scroll',
				}}
			>
				<Outlet />
			</Box>
		</Box>
	);
};

export default Sidebar;
