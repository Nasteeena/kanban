import React from 'react';
import { headerItemView } from '@/models/elementView.interface';

export default interface headerProps {
	tag: headerItemView;
	children: React.ReactNode;
	classname?: string;
}
