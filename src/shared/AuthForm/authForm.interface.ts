import { FormEvent } from 'react';

export interface authFormProps {
    formSubmit: (e: FormEvent<EventTarget>) => void, 
    link: string, 
    infoMessage: string, 
    linkMessage: string,
    logHeader: string,
    errorMessage: string | undefined,
    isRegister?: boolean
}