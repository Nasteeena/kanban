import Header from '@/shared/Header/Header';
import ButtonComponent from '@/shared/Button/Button';
import styles from './changeElement.module.css';
import TextElement from '@/shared/TextElement/TextElement';
import React from 'react';
import { headerItemView } from '@/models/elementView.interface';

interface ChangeElementProps {
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	value: string;
	textChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	open: boolean;
	changeTitle: () => void;
	children: React.ReactNode;
	classname: string;
	tag: headerItemView;
	closeForm?: () => void;
}

const ChangeElement = ({
	handleSubmit,
	value,
	textChange,
	open,
	changeTitle,
	children,
	classname,
	tag,
	closeForm,
}: ChangeElementProps) => {
	return (
		<>
			{open ? (
				<form className={styles.form__container} onSubmit={handleSubmit}>
					<TextElement
						value={value}
						onChange={textChange}
						variant="filled"
						size="small"
						autoFocus={true}
						sx={{ '& input': { padding: '5px' }, margin: '20px 0px 27px 20px' }}
					/>
					<ButtonComponent onClick={closeForm} classname={styles.formButton}>
						X
					</ButtonComponent>
				</form>
			) : (
				<div className={styles.change__title} onClick={changeTitle}>
					<Header classname={classname} tag={tag}>
						{children}
					</Header>
				</div>
			)}
		</>
	);
};

export default ChangeElement;
