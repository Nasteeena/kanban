import { ButtonProps } from './Button.interface';
import cn from 'classnames';
import styles from './Button.module.css';

const ButtonComponent: React.FC<ButtonProps>= ({children, appearance, classname, ...props}): JSX.Element => {
    return (
        <button {...props} className={cn(styles.button, classname, {
            [styles['small']] : appearance === 'small',
            [styles['big']] : appearance === 'big'
        })}>
            {children}
        </button>
    );
};

export default ButtonComponent;
