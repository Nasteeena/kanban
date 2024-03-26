import { Box, Typography } from '@mui/material';
import ButtonComponent from '@/shared/Button/Button';
import { Link } from 'react-router-dom';
import { authFormProps } from './authForm.interface';
import ErrorMessage from '@/shared/ErrorMessage/ErrorMessage';
import TextElement from '../TextElement/TextElement';

const boxStyle = {
	color: '#525252',
	fontWeight: '700',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
};

const AuthForm = ({
	formSubmit,
	link,
	infoMessage,
	linkMessage,
	logHeader,
	errorMessage,
	isRegister,
}: authFormProps) => {
	return (
		<form onSubmit={formSubmit}>
			<Box sx={{ ...boxStyle }}>
				<Typography variant="h5" sx={{ m: '0px 0px 20px 0px', fontWeight: '800' }}>
					{logHeader}
				</Typography>
				{errorMessage && <ErrorMessage text={errorMessage} />}
				<TextElement label="Email" name="email" />
				<TextElement label="Password" name="pass" type="password" />
				{isRegister && <TextElement label="Type your name" name="userName" />}
				<ButtonComponent appearance="big">Click</ButtonComponent>
				<Typography variant="h6" sx={{ m: '30px 0px 0px 0px' }}>
					{infoMessage}
					<Link to={link} style={{ color: 'var(--button-color)', marginLeft: '7px' }}>
						{linkMessage}
					</Link>
				</Typography>
			</Box>
		</form>
	);
};

export default AuthForm;
