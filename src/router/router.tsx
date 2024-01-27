import { createBrowserRouter } from 'react-router-dom';
import Sidebar from '@/layout/Sidebar/Sidebar';
import Auth from '@/layout/Auth/Auth';
import Login from '@/containers/pages/Login/Login';
import Register from '@/containers/pages/Register/Register';
import NotFound from '@/containers/pages/NotFound/NotFound';
import Main from '@/containers/pages/Main/Main';
import Redirect from '@/containers/Redirect/Redirect';
import ROUTER from './routerVariables';
import Table from '@/containers/pages/Table/Table';

const router = createBrowserRouter([
    {
        path: ROUTER.ROOT,
        element: <Redirect>
                    <Sidebar />
                </Redirect> ,
        children: [
            {
                path: ROUTER.ROOT,
                element: <Main />
            },

            {
                path: '/project/:title/:projectId',
                element: <Table/>
            },
        ]
    },

    {
        path: ROUTER.AUTH,
        element: <Auth />,
        children: [
            {
                path: ROUTER.REGISTER,
                element: <Register />
            },
            {
                path: ROUTER.LOGIN,
                element: <Login />
            }
        ]
    },

    {
        path: ROUTER.NOT_FOUND,
        element: <NotFound />
    }
]);

export default router;

