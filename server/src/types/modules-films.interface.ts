export interface IDiscoverFilmFilter {
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

export interface IFilmData {
    id: number;
    title: string;
    poster_path: string;
    adult: boolean;
    overview: string;
    original_language: string;
    backdrop_path: string;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
    language: string;
    runtime: number;
    production_countries: { name: string }[];
    genres: { id: number; name: string }[];
    release_date: string;
}

export interface IReleaseDateParams {
    format?: string;
}

export interface IFilmResponse {
    page: number;
    total_results: number;
    total_pages: number;
    results: IFilmData[];
}