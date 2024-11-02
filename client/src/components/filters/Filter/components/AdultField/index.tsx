import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export const AdultField: React.FC = () => (
    <Field name="includeAdult" type="checkbox">
        {({ input }: FieldRenderProps<boolean>) => (
            <FormControlLabel
                control={<Checkbox {...input} />}
                label={<FormattedMessage id="filters.include_adult" />}
            />
        )}
    </Field>
);