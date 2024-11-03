import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import {
    Accordion, AccordionDetails,
    AccordionSummary, Box, Grid,
    Link, TextField, Paper,
    Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';
import MovieIcon from '@mui/icons-material/Movie';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation } from '@apollo/client';

import defaultImage from '../../../assets/img/default-image.png';
import theme from '../../../assets/theme';
import { DELETE_USER, UPDATE_USER } from '../../../gqlClient/mutations/mutations';
import { AUTH_TOKEN } from '../../../common/const';
import ConfirmDelete from '../../status/ConfirmDeleteAccount';
import {IProfileProps} from '../../../types/user.interface';


const profileStyle = { padding: 20, minHeight: '58vh', maxWidth: 660, margin: '60px auto' };

const Profile: React.FC<IProfileProps> = ({ data, numberOfFilms }) => {
    const navigate = useNavigate();

    const [editForm, setEditForm] =
        useState<{ email: string; username: string }>({
        email: '',
        username: '',
    });
    const [openConfirm, setOpenConfirm] = useState<boolean>(false);
    const [link, setLink] = useState<string>('');

    const [updateUser] = useMutation(UPDATE_USER);
    const [deleteUser] = useMutation(DELETE_USER, {
        onCompleted: () => {
            localStorage.removeItem(AUTH_TOKEN);
            navigate('/');
        },
        onError: (error) => {
            console.error('Error deleting user:', error);
        },
    });

    useEffect(() => {
        if (data && data.user) {
            const { email, username } = data.user;
            setEditForm({
                email,
                username,
            });
        }
    }, [data]);

    useEffect(() => {
        if (numberOfFilms.length > 0) {
            const link = `http://${window.location.host}/recommend?title=&ids=${numberOfFilms.join()}`;
            setLink(link);
        } else {
            setLink('');
        }
    }, [numberOfFilms]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setEditForm({
            ...editForm,
            [name]: value,
        });
    };

    const handleDeleteAccount = async (): Promise<void> => {
        try {
            await deleteUser();
            setOpenConfirm(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            await updateUser({
                variables: {
                    email: editForm.email,
                    username: editForm.username,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };

    const onLogOutClick = (): void => {
        localStorage.removeItem(AUTH_TOKEN);
        navigate('/');
    };

    return (
        <>
            {openConfirm ? (
                <ConfirmDelete handleDeleteAccount={handleDeleteAccount} setOpenConfirm={setOpenConfirm} />
            ) : (
                <Paper elevation={10} style={profileStyle}>
                    <Grid>
                        <h2><FormattedMessage id="profile.profile" /></h2>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Box>
                                <img src={defaultImage} alt="User" />

                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Accordion sx={{
                                        maxWidth: '440px',
                                        border: 0.7,
                                        borderColor: 'rgba(0, 0, 0, 0.6)',
                                        marginTop: '50px'
                                    }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1-content"
                                            id="panel1-header"
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <EditIcon sx={{ fill: '#858584' }} />
                                                <Box sx={{ marginLeft: '10px' }}>
                                                    <FormattedMessage id="profile.edit_profile" />
                                                </Box>
                                            </Box>
                                        </AccordionSummary>
                                        <AccordionDetails sx={{ height: '240px' }}>
                                            <Box
                                                component="form"
                                                onSubmit={handleSubmit}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    height: '150px',
                                                }}
                                            >
                                                <TextField
                                                    id="email"
                                                    label="Email"
                                                    name="email"
                                                    value={editForm.email}
                                                    variant="standard"
                                                    onChange={handleChange}
                                                    sx={{ mx: '20px' }}
                                                />
                                                <TextField
                                                    id="username"
                                                    label="Username"
                                                    name="username"
                                                    value={editForm.username}
                                                    variant="standard"
                                                    onChange={handleChange}
                                                    sx={{ mx: '20px' }}
                                                />
                                                <Box>
                                                    <Button
                                                        variant="contained"
                                                        type="submit"
                                                        size="large"
                                                        sx={{ marginTop: '16px' }}
                                                    >
                                                        <FormattedMessage id="profile.edit" />
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion sx={{
                                        maxWidth: '440px',
                                        border: 0.7,
                                        borderColor: 'rgba(0, 0, 0, 0.6)',
                                        marginTop: '10px'
                                    }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2-content"
                                            id="panel2-header"
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <MovieIcon sx={{ fill: '#858584' }} />
                                                <Box sx={{ marginLeft: '10px' }}>
                                                    <FormattedMessage id="profile.selected_films" />
                                                </Box>
                                            </Box>
                                        </AccordionSummary>
                                        <AccordionDetails sx={{ height: '240px', display: 'flex', flexDirection: 'column' }}>
                                            <Typography sx={{ fontSize: '20px' }}>
                                                {numberOfFilms.length} <FormattedMessage id="profile.selected_films" />
                                            </Typography>
                                            <Link href={link} onClick={(event) => {
                                                if (numberOfFilms.length <= 0) {
                                                    event.preventDefault();
                                                }
                                            }}>
                                                <Button
                                                    disabled={numberOfFilms.length <= 0}
                                                    sx={{ background: theme.palette.primary.light }}
                                                    variant="contained"
                                                    size="large"
                                                >
                                                    <Typography>
                                                        <FormattedMessage id="profile.open_selected_films" />
                                                    </Typography>
                                                </Button>
                                            </Link>
                                        </AccordionDetails>
                                    </Accordion>
                                </Box>
                            </Box>
                            <Box sx={{ marginTop: '98px', display: 'flex', justifyContent: 'space-between' }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    sx={{ background: theme.palette.primary.contrastText }}
                                    onClick={() => setOpenConfirm(true)}
                                >
                                    <DeleteIcon sx={{ fill: theme.palette.text.primary }} />
                                    <Typography sx={{ color: theme.palette.text.primary }}>
                                        <FormattedMessage id="profile.delete_account" />
                                    </Typography>
                                </Button>
                                <Link>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={onLogOutClick}
                                    >
                                        <LogoutIcon />
                                        <Typography sx={{ paddingLeft: '14px' }}>
                                            <FormattedMessage id="profile.log_out" />
                                        </Typography>
                                    </Button>
                                </Link>
                            </Box>
                        </Box>
                    </Grid>
                </Paper>
            )}
        </>
    );
};

export default Profile;