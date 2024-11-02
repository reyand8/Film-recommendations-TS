import React from 'react';
import { FormattedMessage } from 'react-intl';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Box, CardContent, Typography, MenuItem } from '@mui/material';

import CardMenu from '../CardMenu';
import {ICardFilmSelectedProps} from '../../../types/props.interface';


const CardFilmSelected: React.FC<ICardFilmSelectedProps> = ({ film, onCardDelete }) => {
    const { title, releaseDate, image } = film;

    return (
        <Card sx={{ display: 'flex', minHeight: '160px' }}>
            <CardMedia
                component="img"
                sx={{ width: 120 }}
                image={image}
                alt={title}/>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', position: 'relative' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h4">
                        {title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {releaseDate}
                    </Typography>
                </CardContent>
                <CardMenu>
                    <MenuItem onClick={() => onCardDelete(film)}>
                        <FormattedMessage id="delete" />
                    </MenuItem>
                </CardMenu>
            </Box>
        </Card>
    );
};

export default CardFilmSelected;