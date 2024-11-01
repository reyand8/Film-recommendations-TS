import {IRoutes} from '../types/routes.interface';

export const ROUTES: IRoutes = {
    HOME: '/',
    FILM: '/film/:id',
    GENRES: '/genres',
    FILMS_BY_GENRE: '/genre/:id',
    SEARCH: '/search',
    RECOMMEND: '/recommend',
    ACCOUNT: '/account',
};