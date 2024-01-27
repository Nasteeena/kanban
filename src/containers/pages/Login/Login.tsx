import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ROUTER from '@/router/routerVariables';
import useAuth from '@/hooks/useAuth';
import { FormValues } from '@/interfaces/logRegister.interface';
import { LOGANDREGISTER } from '@/utils/constants';
import { logIn, clearLoginError } from '@/store/slices/user.slice';
import LogElement from '@/components/LogElement/LogElement';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuth, loginErrorMessage } = useAuth();

    useEffect(() => {
        if(isAuth) {
            navigate(ROUTER.ROOT);
        }
    });

    const formSubmit = (e: React.FormEvent<EventTarget>): void => {
        e.preventDefault();
        dispatch(clearLoginError());
        const {pass, email} = e.target as typeof e.target & FormValues;
        const emailValue = email.value;
        const passValue = pass.value;
        dispatch(logIn({email: emailValue, password: passValue}));
    };

    return (
            <LogElement
                errorMessage={loginErrorMessage}
                formSubmit={formSubmit} 
                link='/auth/register'
                infoMessage={LOGANDREGISTER.LOGIN_INFO_MESSAGE}
                linkMessage={LOGANDREGISTER.LOGIN_LINK_MESSAGE}
                logHeader={LOGANDREGISTER.LOGIN_HEADER}
            />
    );
};

export default Login;
