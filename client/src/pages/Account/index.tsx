import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';

import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { FormattedMessage } from 'react-intl';
import { useMutation, useQuery } from '@apollo/client';

import SignIn from '../../components/account/SignIn';
import SignUp from '../../components/account/SignUp';
import Profile from '../../components/account/Profile';
import Loading from '../../components/status/Loading';
import { AUTH_TOKEN, STORAGE_SELECTED_FILMS_KEY } from '../../common/const';
import { SIGN_UP_MUTATION, SIGN_IN_MUTATION, UPDATE_USER } from '../../gqlClient/mutations/mutations';
import {GET_USER} from '../../gqlClient/quieries/queries';
import { saveIdsToStorage } from '../../utils/localStorage';
import {IFormAccUser, IUserData, IUserSelectedFilms} from '../../types/user.interface';

const paperStyle = { padding: 20, minHeight: '42vh', maxWidth: 360, margin: '60px auto' };


const Account: React.FC = () => {
    const navigate = useNavigate();
    const [formState, setFormState] =
        useState<IFormAccUser>({ username: '', email: '', password: '' });

    const [login, setLogin] = useState(false);
    const [numberOfFilms, setNumberOfFilms] = useState<number[]>([]);

    const { loading, error, data } = useQuery<IUserData>(GET_USER);

    const [signInUser] = useMutation(SIGN_IN_MUTATION, {
        variables: {
            email: formState.email,
            password: formState.password,
        },
        onCompleted: ({ signInUser }) => {
            localStorage.setItem(AUTH_TOKEN, signInUser.token);
        },
    });

    const [signUpUser] = useMutation(SIGN_UP_MUTATION, {
        variables: {
            username: formState.username,
            email: formState.email,
            password: formState.password,
        },
        onCompleted: ({ signUpUser }) => {
            localStorage.setItem(AUTH_TOKEN, signUpUser.token);
        },
    });

    const [updateUser] = useMutation<IUserSelectedFilms>(UPDATE_USER);

    useEffect(() => {
        const fetchAndUpdateSelectedList = async () => {
            const allSelectedFilms = data?.user.selectedFilms;
            try {
                const localStorageFilms = localStorage.getItem(STORAGE_SELECTED_FILMS_KEY);
                if (localStorageFilms) {
                    await updateSelectedList(JSON.parse(localStorageFilms));
                } else if (allSelectedFilms) {
                    const parsedFilms = JSON.parse(allSelectedFilms.replace(/'/g, '"'));
                    saveIdsToStorage(STORAGE_SELECTED_FILMS_KEY, parsedFilms);
                    await updateSelectedList(parsedFilms);
                }
                const storedFilms = localStorage.getItem(STORAGE_SELECTED_FILMS_KEY);
                if (storedFilms) {
                    setNumberOfFilms(JSON.parse(storedFilms));
                }
            } catch (error) {
                console.error('Error updating selected list:', error);
            }
        };
        fetchAndUpdateSelectedList().catch(error => {
            console.error('Error updating selected list:', error);
        });
    }, [data]);

    const updateSelectedList = async (dataList: string[]): Promise<void> => {
        try {
            if (dataList) {
                const newList: string[] = [...new Set(dataList)].slice(0, 20);
                await updateUserList(newList);
            }
        } catch (error) {
            console.error('Error updating selected list:', error);
        }
    };

    const updateUserList = async (newList: string[]): Promise<void> => {
        const result: string = `[${newList.map(item => `'${item}'`).join(', ')}]`;
        try {
            await updateUser({
                variables: {
                    username: formState.username,
                    email: formState.email,
                    selectedFilms: result,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return <Loading />;
    }

    const handlerChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        if ((e.target as HTMLFormElement).checkValidity()) {
            login ? await signUpUser() : await signInUser();
            navigate('/account');
            window.location.reload();
        }
    };

    return (
        <>
            {data ? (
                <Profile data={data} numberOfFilms={numberOfFilms} />
            ) : (
                <Grid>
                    <Paper elevation={10} style={paperStyle}>
                        <Grid>
                            <h2>
                                {login ? <FormattedMessage id="auth.sign_up" /> : <FormattedMessage id="auth.sign_in" />}
                            </h2>
                        </Grid>
                        {login ? (
                            <SignUp
                                handlerChange={handlerChange}
                                handleSubmit={handleSubmit}
                                formState={formState}
                                setLogin={setLogin}
                            />
                        ) : (
                            <SignIn
                                handlerChange={handlerChange}
                                handleSubmit={handleSubmit}
                                formState={formState}
                                setLogin={setLogin}
                            />
                        )}
                    </Paper>
                </Grid>
            )}
        </>
    );
};

export default Account;