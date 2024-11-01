import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

import { IMAGE_BASE_PATH } from '../../../config';
import {IFilmData, IReleaseDateParams} from '../../../types/modules-films.interface';


export class Film {
    film: IFilmData;
    id: number;
    title: string;
    posterPath: string;
    adult: boolean;
    overview: string;
    originalLanguage: string;
    backdropPath: string;
    popularity: number;
    voteCount: number;
    video: boolean;
    voteAverage: number;
    language: string;
    runtime: number;
    production: { name: string }[];
    genres: { id: number; name: string }[];

    constructor(film: IFilmData) {
        this.film = film;
        this.id = film.id;
        this.title = film.title;
        this.posterPath = `${IMAGE_BASE_PATH}${film.poster_path}`;
        this.adult = film.adult;
        this.overview = film.overview;
        this.originalLanguage = film.original_language;
        this.backdropPath = `${IMAGE_BASE_PATH}${film.backdrop_path}`;
        this.popularity = film.popularity;
        this.voteCount = film.vote_count;
        this.video = film.video;
        this.voteAverage = film.vote_average;
        this.language = film.language;
        this.runtime = film.runtime;
        this.production = film.production_countries;
        this.genres = film.genres;
    }

    releaseDate(params: IReleaseDateParams): string{
        try {
            const date: string = params.format
                ? format(new Date(this.film.release_date), params.format, { locale: enUS })
                : this.film.release_date;
            return date
        } catch (e) {
            console.error(e);
            return this.film.release_date;
        }
    }
}