import React from 'react';
import { Box, Grid, Pagination, Paper } from '@mui/material';
import { useQuery } from '@apollo/client';

import { CardFilm } from '../index';
import DataError from '../status/DataError';
import Loading from '../status/Loading';
import { FILMS_BY_FILTER_QUERY } from '../../gqlClient/quieries/queries';
import {IFilm} from '../../types/films.interface';
import {IFilterFilmsProps} from '../../types/props.interface';


const FilterFilms: React.FC<IFilterFilmsProps> = ({ filter, setPage, selectFilm }) => {
    const { loading, error, data } = useQuery(FILMS_BY_FILTER_QUERY, {
        variables: { filter },
    });

    const paginationHandler = (event: React.ChangeEvent<unknown>, page: number) => {
        event.preventDefault();
        setPage(page);
    };

    const pagesCount: number = data?.filmsByFilter?.totalPages
        ? Math.min(data.filmsByFilter.totalPages, 500)
        : 0;

    if (error) {
        return <DataError />;
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <Grid item xs={12} md={8.5}>
            <Paper>
                <Box sx={{ flexGrow: 1, mb: 8, p: 2 }}>
                    {data && (
                        <Grid container spacing={2}>
                            {data.filmsByFilter.results.map((film: IFilm) => (
                                <Grid key={film.id} item xs={12} sm={6} md={4} lg={3}>
                                    <CardFilm film={film} onCardSelect={selectFilm} />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                    <Box mt={2} pb={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Pagination
                            count={pagesCount}
                            page={filter.page}
                            onChange={paginationHandler}
                        />
                    </Box>
                </Box>
            </Paper>
        </Grid>
    );
};

export default FilterFilms;