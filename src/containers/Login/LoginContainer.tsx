import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ROUTER from '@/router/routerVariables';
import useAuth from '@/hooks/useAuth';
import { FormValues } from '@/models/user.interface';
import { LOG_AND_REGISTER } from '@/utils/constants';
import { clearLoginError } from '@/store/slices/user.slice';
import { logIn } from '@/store/services/user.service';
import AuthForm from '@/shared/AuthForm/AuthForm';

const LoginContainer = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isAuth, loginErrorMessage } = useAuth();

	useEffect(() => {
		if (isAuth) {
			navigate(ROUTER.ROOT);
		}
	});

	const formSubmit = (e: React.FormEvent<EventTarget>): void => {
		e.preventDefault();
		dispatch(clearLoginError());
		const { pass, email } = e.target as typeof e.target & FormValues;
		const emailValue = email.value;
		const passValue = pass.value;
		dispatch(logIn({ email: emailValue, password: passValue }));
	};

	return (
		<AuthForm
			errorMessage={loginErrorMessage}
			formSubmit={formSubmit}
			link="/auth/register"
			infoMessage={LOG_AND_REGISTER.LOGIN_INFO_MESSAGE}
			linkMessage={LOG_AND_REGISTER.LOGIN_LINK_MESSAGE}
			logHeader={LOG_AND_REGISTER.LOGIN_HEADER}
		/>
	);
};

export default LoginContainer;
