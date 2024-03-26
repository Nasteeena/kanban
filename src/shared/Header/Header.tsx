import styles from './header.module.css';
import headerProps from './header.interface';
import cn from 'classnames';

const Header = ({ tag, children, classname }: headerProps) => {
	switch (tag.tag) {
		case 'h1':
			return <h1 className={cn(styles.h1, classname)}>{children}</h1>;
		case 'h2':
			return <h2 className={cn(styles.h2, classname)}>{children}</h2>;
		case 'h3':
			return <h3 className={cn(styles.h3, classname)}>{children}</h3>;
		case 'h4':
			return <h4 className={cn(styles.h4, classname)}>{children}</h4>;
	}
};

export default Header;
