import { ChangeEvent } from 'react';

export interface headerProps {
    inputValue: string,
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
    userName: string | null,
    openSettings: () => void
}