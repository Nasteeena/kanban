import { SIDEBAR } from '@/utils/constants';
import React from 'react';
import Header from '@/shared/Header/Header';

const ProjectSubHeader = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Header tag={{ tag: 'h4' }}>
				{SIDEBAR.SUB_HEADER}
				{children}
			</Header>
		</>
	);
};

export default ProjectSubHeader;
