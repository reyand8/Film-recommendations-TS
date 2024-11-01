import axios from 'axios';

import { API_KEY, API_BASE_URL } from '../../config';
import { Genre } from './entities/Genre';
import {IGenreData} from '../../types/modules-genres.interface';


const getList = async (language: string): Promise<Genre[]> => {
    const result =
        await axios.get(`${API_BASE_URL}genre/movie/list?api_key=${API_KEY}&language=${language}`);
    return result.data.genres.map((genre: IGenreData) => new Genre(genre));
}

export { getList };