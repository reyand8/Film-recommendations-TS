import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Box, Grid } from '@mui/material';

import DataError from '../../components/status/DataError';
import Loading from '../../components/status/Loading';
import CardSingleFilm from '../../components/card/CardSingleFilm';
import { FILM_DETAILS_QUERY } from '../../gqlClient/quieries/queries';
import {IFilmId, IFilmsById} from '../../types/films.interface';


const SingleFilm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { loading, error, data } =
        useQuery<IFilmsById, IFilmId>(FILM_DETAILS_QUERY, {
        variables: {
            ids: Number(id),
        },
    });

    if (error) {
        return <DataError />;
    }

    return (
        <>
            {loading ? <Loading /> : (
                <Box>
                    {data && (
                        <Grid container spacing={2}>
                            {data.filmsById.map((film) => (
                                <CardSingleFilm key={film.id} film={film} />
                            ))}
                        </Grid>
                    )}
                </Box>
            )}
        </>
    );
};

export default SingleFilm;