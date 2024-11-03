import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import {IGenreFieldProps} from '../../../../../types/props.interface';


export const GenreField: React.FC<IGenreFieldProps> = ({ data }) => {
    return (
        <Field name="genre">
            {({ input }: FieldRenderProps<string | number>) => (
                <FormattedMessage id="filters.genre">
                    {(placeholder) => (
                        <FormControl sx={{ minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-label">{placeholder}</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                autoWidth
                                label={placeholder}
                                {...input}
                            >
                                {data.genres.map(({ name, id }) => (
                                    <MenuItem key={id} value={id}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                </FormattedMessage>
            )}
        </Field>
    );
};