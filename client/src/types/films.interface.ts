import {SORT_DIRECTION} from '../common/const';


export interface IFilmIds {
    ids: number[];
}

export interface IFilmId {
    ids: number;
}

export interface IFilmsById {
    filmsById: IFilm[];
}


export interface IFilmsBySearch {
    filmsBySearchQuery: {
        results: IFilm[];
        totalPages: number;
    };
}

export interface IFilmsByPopularity {
    filmsByPopularity: {
        results: IFilm[];
        totalPages: number;
    };
}

export interface IFilmsByGenreData {
    filmsByGenre: {
        results: IFilm[];
        totalPages: number;
    };
}

export interface IFilterFilms {
    releaseDateGte?: number;
    releaseDateLte?: number;
    genre?: number;
    includeAdult: boolean;
    sortDirection: SORT_DIRECTION;
    sortBy: string;
    page: number;
}

export interface IFilterFilmsByGenre {
    filter: {
        genre?: number | undefined;
    };
}

export interface ICardFilmProps {
    film: IFilm;
    onCardSelect?: (film: IFilm) => void;
    isPreviewMode?: boolean;
}

export interface IFilm {
    id: string;
    title: string;
    image: string,
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
    productionCountries: { name: string }[];
    genres: { id: number; name: string }[];
    releaseDate: string;
}