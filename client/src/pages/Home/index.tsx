import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useQuery } from '@apollo/client';

import {Filters} from '../../components/filters/Filter';
import {useFilters} from '../../hooks/useFilters';
import {useFilms} from '../../hooks/useFilms';
import { useAppContext} from '../../providers/appContext';
import {FILM_DETAILS_QUERY} from '../../gqlClient/quieries/queries';
import {IFilterFilms} from '../../types/films.interface';
import PopularFilms from '../../components/home/PopularFilms';
import FilterFilms from '../../components/home/FilterFilms';
import {SelectedFilmsSection} from '../../components';


const Home: React.FC = () => {
    const [click, setClick] = useState<boolean>(false);
    const { filter, setFilter, setPage } = useFilters();
    const { state } = useAppContext();

    const { selectedFilms, setSelectedFilms, selectFilm, deleteFilm } = useFilms();
    const selectedFilmsIds = state.selectedFilmsId.map((el: string) => +el);

    const {loading, error, data } = useQuery(FILM_DETAILS_QUERY,
        {variables: {
                ids: selectedFilmsIds,
            }});

    useEffect(() => {
        if (!data) {
            return;
        }
        setSelectedFilms(data.filmsById);
    }, [data]);

    const onSubmit = (data: IFilterFilms): void => {
        setClick(true);
        setFilter(data);
    };

    return (
        <>
            <Box>
                <Grid container sx={{ flexGrow: 1, my: 4}}>
                    <Grid item xs={9} md={12}  sx={{ mb: 6 }}>
                        <Paper sx={{padding: '16px'}}>
                            <Filters onSubmit={onSubmit} initialValues={filter} />
                        </Paper>
                    </Grid>
                    <Box sx={{ flexGrow: 1, mt: 2 }}>
                        <Grid container spacing={6}>
                            {click
                                ? (
                                    <FilterFilms filter={filter} selectFilm={selectFilm} setPage={setPage} />
                                )
                                : <PopularFilms selectFilm={selectFilm}/>
                            }
                            <Grid item xs={12} md={3.5}>
                                <SelectedFilmsSection
                                    selectedFilms={selectedFilms}
                                    deleteFilm={deleteFilm}
                                    loading={loading}
                                    error={error}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Box>
        </>
    );
};


export default Home;