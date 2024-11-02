import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import theme from '../../../assets/theme';
import {ICardGenreProps} from '../../../types/props.interface';


const CardGenre: React.FC<ICardGenreProps> = ({ genre }) => {
    const { id, name } = genre;
    return (
        <Link to={`/genre/${id}`}>
            <Card
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 300,
                    height: '112px',
                    color: theme.palette.text.secondary,
                }}
            >
                <Typography variant="h3">
                    {name}
                </Typography>
            </Card>
        </Link>
    );
};

export default CardGenre;