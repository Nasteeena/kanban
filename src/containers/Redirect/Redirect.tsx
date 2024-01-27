import { Navigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

const Redirect = ({ children }: {children: React.ReactNode}) => {
    const { isAuth } = useAuth();

    if(!isAuth) {
        return <Navigate to='/auth/login'/>;
    }

    return (
        <>
            {children}
        </>
    );
};

export default Redirect;
