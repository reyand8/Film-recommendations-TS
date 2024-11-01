export interface IFilmsByFilterArgs {
    filter: IFilter;
}

export interface IFilter {
    page: number;
    sortBy: string;
    sortDirection: 'asc' | 'desc';
    adult: boolean;
    releaseDateGte: number;
    releaseDateLte: number;
    genre: number;
}

export interface ISearchQuery {
    query: string;
    page: number;
}

export interface IFilmsBySearchQueryArgs {
    search: ISearchQuery;
}

export interface IFilmsByPopularityArgs {
    page: number;
}

export interface IFilmsByGenreArgs {
    filter: any;
}

export interface IFilmsByIdArgs {
    ids: string[];
}

export interface IContext {
    locale: string;
    userId: string;
}