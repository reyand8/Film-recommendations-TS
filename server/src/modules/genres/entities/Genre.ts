import {IGenreData} from '../../../types/modules-genres.interface';

class Genre {
    id: number;
    name: string;
    constructor(genre: IGenreData) {
        this.id = genre.id;
        this.name = genre.name;
    }
}

export { Genre };