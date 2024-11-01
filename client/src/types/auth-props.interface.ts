import React from 'react';

export interface ISignUpProps {
    formState: {
        username: string;
        email: string;
        password: string;
    };
    handlerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ISignInProps {
    formState: {
        username?: string;
        email: string;
        password: string;
    };
    handlerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}