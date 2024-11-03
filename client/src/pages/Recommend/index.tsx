import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';
import { useQuery } from '@apollo/client';

import { CardFilm } from '../../components';
import DataError from '../../components/status/DataError';
import Loading from '../../components/status/Loading';
import {FILM_DETAILS_QUERY} from '../../gqlClient/quieries/queries';
import {IFilm, IFilmsById, IFilmIds} from '../../types/films.interface';


const Recommend: React.FC = () => {
    const [searchParams] = useSearchParams();
    const idsParam: string | null = searchParams.get('ids');
    const ids: number[] = idsParam ? idsParam.split(',').map((id) => parseInt(id, 10)) : [];

    const { loading, error, data } =
        useQuery<IFilmsById, IFilmIds>(FILM_DETAILS_QUERY, {
        variables: { ids },
    });

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <DataError />;
    }

    return (
        <Box sx={{ height: '100%', marginBottom: '40px' }}>
            <Typography sx={{ my: 4 }} variant="h2" component="h1" gutterBottom>
                {searchParams.get('title')}
            </Typography>
            {data?.filmsById && (
                <Grid container spacing={3}>
                    {data.filmsById.map((film: IFilm) => (
                        <Grid key={film.id} item xs={12} sm={6} md={4} lg={3}>
                            <CardFilm film={film} isPreviewMode />
                        </Grid>
                    ))}
                </Grid>
            )}
            <Grid sx={{ height: '90px' }}></Grid>
        </Box>
    );
};

export default Recommend;