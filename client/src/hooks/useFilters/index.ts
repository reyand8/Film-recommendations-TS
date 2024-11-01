import { useState, useCallback } from 'react';

import { SORT_DIRECTION } from '../../common/const';
import {IFilterFilms} from "../../types/films.interface";


export const useFilters = () => {
    const [filter, setFilterFields] = useState<IFilterFilms>({
        page: 1,
        sortBy: 'original_title',
        sortDirection: SORT_DIRECTION.DESC,
        includeAdult: false,
    });

    const setPage = useCallback((page: number): void => {
        setFilterFields({
            ...filter,
            page,
        });
    }, [filter]);

    const setFilter = useCallback((filterFields: Partial<IFilterFilms>) => {
        setFilterFields({
            ...filter,
            ...filterFields,
        });
    }, [filter]);

    return {
        filter,
        setFilterFields,
        setPage,
        setFilter,
    };
};