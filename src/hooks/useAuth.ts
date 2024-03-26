import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const useAuth = () => {
	const { email, id, loginErrorMessage, registerErrorMessage, displayName, nameLoading } =
		useSelector((state: RootState) => state.user);

	return {
		isAuth: !!email,
		email,
		id,
		loginErrorMessage,
		registerErrorMessage,
		displayName,
		nameLoading,
	};
};

export default useAuth;
