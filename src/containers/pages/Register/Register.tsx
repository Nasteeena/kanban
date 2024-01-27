import {useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { useDispatch } from 'react-redux';
import ROUTER from '@/router/routerVariables';
import { useEffect } from 'react';
import { FormValues } from '@/interfaces/logRegister.interface';
import { LOGANDREGISTER } from '@/utils/constants';
import { register } from '@/store/slices/user.slice';
import LogElement from '@/components/LogElement/LogElement';

const Register = () => {
    const dispatch = useDispatch();
    const { isAuth, registerErrorMessage } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuth) {
            navigate(ROUTER.ROOT);
        }
    });
    
    const formSubmit = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        const { pass, email, userName } = e.target as typeof e.target & FormValues;
        const emailValue = email.value;
        const passValue = pass.value;
        const nameValue = userName.value;
        dispatch(register({email: emailValue, password: passValue, userName: nameValue}));
    };

    return (
        <>
            <LogElement
                errorMessage={registerErrorMessage}
                formSubmit={formSubmit} 
                link='/auth/login'
                infoMessage={LOGANDREGISTER.REGISTER_INFO_MESSAGE}
                linkMessage={LOGANDREGISTER.REGISTER_LINK_MESSAGE}
                logHeader={LOGANDREGISTER.REGISTER_HEADER}
                isRegister={true}
            />
        </>
    );
};

export default Register;
