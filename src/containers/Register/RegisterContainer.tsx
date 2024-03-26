import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { useDispatch } from 'react-redux';
import ROUTER from '@/router/routerVariables';
import { useEffect } from 'react';
import { FormValues } from '@/models/user.interface';
import { LOG_AND_REGISTER } from '@/utils/constants';
import { register } from '@/store/services/user.service';
import AuthForm from '@/shared/AuthForm/AuthForm';

const RegisterContainer = () => {
	const dispatch = useDispatch();
	const { isAuth, registerErrorMessage } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuth) {
			navigate(ROUTER.ROOT);
		}
	});

	const formSubmit = (e: React.FormEvent<EventTarget>) => {
		e.preventDefault();
		const { pass, email, userName } = e.target as typeof e.target & FormValues;
		const emailValue = email.value;
		const passValue = pass.value;
		const nameValue = userName.value;
		dispatch(register({ email: emailValue, password: passValue, userName: nameValue }));
	};

	return (
		<AuthForm
			errorMessage={registerErrorMessage}
			formSubmit={formSubmit}
			link="/auth/login"
			infoMessage={LOG_AND_REGISTER.REGISTER_INFO_MESSAGE}
			linkMessage={LOG_AND_REGISTER.REGISTER_LINK_MESSAGE}
			logHeader={LOG_AND_REGISTER.REGISTER_HEADER}
			isRegister={true}
		/>
	);
};

export default RegisterContainer;
