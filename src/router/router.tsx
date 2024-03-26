import { createBrowserRouter } from 'react-router-dom';
import Sidebar from '@/layout/Sidebar/Sidebar';
import Auth from '@/layout/Auth/Auth';
import Redirect from '@/features/Redirect/Redirect';
import ROUTER from './routerVariables';
import Table from '@/pages/Table/TablePage';
import Main from '@/pages/Main/MainPage';
import NotFound from '@/pages/NotFound/NotFoundPage';
import Register from '@/pages/Register/RegisterPage';
import Login from '@/pages/Login/LoginPage';

const router = createBrowserRouter([
	{
		path: ROUTER.ROOT,
		element: (
			<Redirect>
				<Sidebar />
			</Redirect>
		),
		children: [
			{
				path: ROUTER.ROOT,
				element: <Main />,
			},

			{
				path: '/project/:title/:projectId',
				element: <Table />,
			},
		],
	},

	{
		path: ROUTER.AUTH,
		element: <Auth />,
		children: [
			{
				path: ROUTER.REGISTER,
				element: <Register />,
			},
			{
				path: ROUTER.LOGIN,
				element: <Login />,
			},
		],
	},

	{
		path: ROUTER.NOT_FOUND,
		element: <NotFound />,
	},
]);

export default router;
