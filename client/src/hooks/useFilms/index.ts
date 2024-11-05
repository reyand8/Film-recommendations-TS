import {useState, useCallback} from 'react';

import {MAX_SELECTED_FILMS, STORAGE_SELECTED_FILMS_KEY} from '../../common/const';
import {deleteIdsFromStorage, saveIdsToStorage} from '../../utils/localStorage';
import {IFilm} from '../../types/films.interface';

export const useFilms = () => {
    const [selectedFilms, setSelectedFilms] = useState<IFilm[]>([]);

    const selectFilm = useCallback((film: IFilm): void => {
        const length: number = selectedFilms.length;
        const isNewFilm: boolean = !selectedFilms.find(({ id }): boolean => id === film.id);
        if (isNewFilm && length < MAX_SELECTED_FILMS) {
            setSelectedFilms([...selectedFilms, film]);
            setLocalStorageFilms(film.id);
        }
    }, [selectedFilms]);

    const deleteFilm = useCallback((film: IFilm): void => {
        deleteLocalStorageFilms(film.id);
        setSelectedFilms(selectedFilms.filter(({id}) => id !== film.id));
    }, [selectedFilms]);

    const setLocalStorageFilms = ((film: string): void => {
        saveIdsToStorage(STORAGE_SELECTED_FILMS_KEY, film);
    });

    const deleteLocalStorageFilms = ((film: string): void => {
        deleteIdsFromStorage(STORAGE_SELECTED_FILMS_KEY, film);
    });

    return {
        selectedFilms,
        setSelectedFilms,
        selectFilm,
        deleteFilm,
    };
};