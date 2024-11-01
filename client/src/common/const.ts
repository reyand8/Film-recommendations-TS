import {ILocales, ISortOption} from '../types/const.interface';

export const STORAGE_LOCALE_KEY: string = 'locale';

export const STORAGE_SELECTED_FILMS_KEY: string = 'selectedFilms';

export const AUTH_TOKEN: string = 'auth-token';

export const MAX_SELECTED_FILMS: number = 20;

export const CONFIRM_TIMEOUT: number = 3000;

export const SOCIAL_BUTTON_SIZE: number = 32;

export const LOCALES: ILocales = {
    ENGLISH: 'en-US',
    UKRAINIAN: 'uk-UA',
    SPANISH: 'es-ES',
    RUSSIAN: 'ru-RU',
    GERMAN: 'de-DE',
};

export const SORT_OPTIONS: ISortOption[] = [
    { label: 'popularity', value: 'popularity'},
    { label: 'release_date', value: 'release_date'},
    { label: 'revenue', value: 'revenue'},
    { label: 'primary_release_date', value: 'primary_release_date'},
    { label: 'original_title', value: 'original_title'},
    { label: 'vote_average', value: 'vote_average'},
    { label: 'vote_count', value: 'vote_count'},
];

export enum SORT_DIRECTION {
    DESC = 'desc',
    ASC = 'asc',
}