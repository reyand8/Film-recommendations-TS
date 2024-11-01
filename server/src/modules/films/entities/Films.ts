import { Film } from './Film';
import {IFilmData, IFilmResponse} from '../../../types/modules-films.interface';


export class Films {
    page: number;
    totalResults: number;
    totalPages: number;
    results: Film[];
    constructor(films: IFilmResponse) {
        this.page = films.page;
        this.totalResults = films.total_results;
        this.totalPages = films.total_pages;
        this.results = films.results.map((film: IFilmData) => new Film(film))
    }
}