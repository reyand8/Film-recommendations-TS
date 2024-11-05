import React from 'react';

import { FormattedMessage } from 'react-intl';
import Button from '@mui/material/Button';


export const SubmitField: React.FC = () => {
    return (
        <Button variant="contained" type="submit" size="large">
            <FormattedMessage id="filters.submit" />
        </Button>
    );
};