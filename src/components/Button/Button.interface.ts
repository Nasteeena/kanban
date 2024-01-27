import { buttonItemView } from '@/interfaces/elementView.interface';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode,
    appearance?: buttonItemView['appearance']
    classname?: string
}