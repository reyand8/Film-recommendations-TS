import React, {ReactNode} from 'react';
import {ApolloError} from "@apollo/client";

import {IFilm} from './films.interface';
import {IGenre} from './genres.interface';

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

export interface ISelectedFilmsFormProps {
    onSubmit: (values: { listName: string }) => void;
}

export interface ISelectedFilmsSectionProps {
    selectedFilms: IFilm[];
    error: ApolloError | undefined;
    loading: boolean;
    deleteFilm: (film: IFilm) => void;
}

export interface ISocialShareProps {
    url: string;
    title: string;
}

export interface ICardFilmSearchProps {
    film: IFilm;
}

export interface ICardFilmSelectedProps {
    film: IFilm;
    onCardDelete: (film: IFilm) => void;
}

export interface ICardGenreProps {
    genre: IGenre;
}

export interface ICardMenuProps {
    children: ReactNode;
}

export interface ICardSingleFilmProps {
    film: IFilm;
}

export interface IGenreFieldProps {
    data: {
        genres: { id: string | number; name: string }[];
    };
}

export interface IFiltersProps {
    onSubmit: (values: any) => void;
    initialValues?: Record<string, any>;
}