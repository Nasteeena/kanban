import { errorMessageProps } from './errorMessage.interface';
import styles from './errorMessage.module.css';

const ErrorMessage = ({ text }: errorMessageProps) => {
	return <div className={styles.errorMessage}>{text}</div>;
};

export default ErrorMessage;
