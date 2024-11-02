import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { SORT_OPTIONS } from '../../../../../common/const';


export const SortField: React.FC = () => {
    return (
        <Field name="sortBy">
            {({ input }: FieldRenderProps<string>) => (
                <FormattedMessage id="filters.sort_by">
                    {(placeholder) => (
                        <FormControl sx={{ width: { xs: 180, sm: 250 }, my: 3 }}>
                            <InputLabel id="demo-simple-select-label">{placeholder}</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                autoWidth
                                label={placeholder}
                                {...input}
                            >
                                {SORT_OPTIONS.map(({ label, value }) => (
                                    <MenuItem key={value} value={value}>
                                        <FormattedMessage id={`filters.sort.${label}`} />
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