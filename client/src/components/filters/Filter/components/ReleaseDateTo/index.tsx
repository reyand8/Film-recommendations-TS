import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field, FieldRenderProps } from 'react-final-form';
import { TextField } from '@mui/material';


export const ReleaseDateTo: React.FC = () => {
    return (
        <Field name="releaseDateLte">
            {({ input }: FieldRenderProps<string | number>) => (
                <TextField
                    id="outlined-basic"
                    label={<FormattedMessage id="filters.release_date_to" />}
                    variant="outlined"
                    type="number"
                    inputProps={{
                        min: 1800,
                        max: 2030,
                    }}
                    {...input}
                />
            )}
        </Field>
    );
};