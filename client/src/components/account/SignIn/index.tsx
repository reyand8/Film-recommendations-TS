import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, TextField } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { validateSignIn, isValid } from '../validation';
import {ISignInProps} from "../../../types/auth-props.interface";

const btnstyle = { margin: '8px 0' };

const TextFieldBox = styled('form')(({ theme }) => ({
    [theme.breakpoints.up('xs')]: {
        margin: '0 auto',
        maxWidth: '220px',
    },
    [theme.breakpoints.up('md')]: {
        maxWidth: '320px',
    },
    [theme.breakpoints.up('lg')]: {
        maxWidth: '320px',
    },
}));

const SignIn: React.FC<ISignInProps> = ({ formState, handlerChange, handleSubmit, setLogin }) => {
    const [errors, setErrors] =
        useState<{ email?: string; password?: string; }>({
        email: '',
        password: '',
    });

    const handleApolloServerError = (error: Error) => {
        if (error.message.includes('Invalid email or password')) {
            setErrors(prev => ({ ...prev, general: 'Invalid email or password' }));
        } else {
            setErrors(prev => ({ ...prev, general: 'An unexpected error occurred' }));
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formValidation = validateSignIn(formState);
        setErrors(formValidation);
        if (isValid(formValidation)) {
            try {
                await handleSubmit(e);
            } catch (error) {
                handleApolloServerError(error as Error);
            }
        }
    };

    return (
        <>
            <TextFieldBox onSubmit={onSubmit}>
                <TextField
                    sx={{ mb: '16px' }}
                    label="Email"
                    placeholder="Enter email"
                    type="email"
                    variant="outlined"
                    name="email"
                    fullWidth
                    required
                    value={formState.email}
                    onChange={handlerChange}
                    error={!!errors.email}
                    helperText={errors.email}
                />
                <TextField
                    label="Password"
                    placeholder="Enter password"
                    type="password"
                    variant="outlined"
                    name="password"
                    fullWidth
                    required
                    value={formState.password}
                    onChange={handlerChange}
                    error={!!errors.password}
                    helperText={errors.password}
                />
                <FormControlLabel
                    control={<Checkbox name="checkedB" color="primary" />}
                    label={<FormattedMessage id="auth.remember_me" />}
                />
                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    style={btnstyle}
                    fullWidth
                >
                    <FormattedMessage id="auth.sign_in" />
                </Button>
                <Typography sx={{ marginY: '12px' }}>
                    <Link href="#">
                        <FormattedMessage id="auth.forgot_password" />
                    </Link>
                </Typography>
            </TextFieldBox>
            <Typography>
                <Button onClick={() => setLogin((prev: boolean) => !prev)}>
                    <FormattedMessage id="auth.sign_up" />
                </Button>
            </Typography>
        </>
    );
};

export default SignIn;