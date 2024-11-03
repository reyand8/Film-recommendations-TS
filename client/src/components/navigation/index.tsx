import React, {ChangeEvent, useCallback, useEffect, useRef, useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {FormattedMessage} from "react-intl";
import {useQuery} from '@apollo/client';

import { alpha, AppBar, Box, Button, Drawer, Fade, Grid,
    IconButton, Link, List, Menu, MenuItem, Toolbar,
    Typography } from '@mui/material';
import {styled} from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputBase from '@mui/material/InputBase';


import {LOCALES} from '../../common/const';
import theme from '../../assets/theme';
import DataError from '../status/DataError';
import Loading from '../status/Loading';
import {useAppContext} from '../../providers/appContext';
import {FILMS_BY_SEARCH_QUERY} from '../../gqlClient/quieries/queries';
import CardFilmSearch from '../card/CardFilmSearch';
import {IFilm} from '../../types/films.interface';
import {ISearch} from '../../types/search.interface';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const SearchResultBox = styled(Box)(({ theme }) => ({
    zIndex: '9',
    top: '78%',
    position: 'absolute',
    width: '400px',
    right: 159,
    maxHeight: '360px',
    overflowY: 'auto',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '8px',
    borderRadius:' 8px',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.background.paper,
}));


const Navigation: React.FC = () => {
    const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] =
        useState<null | HTMLElement>(null);
    const [searchValue, setSearchValue] = useState<string>('');
    const [page, setPage] = useState<number>(1);

    const searchResultRef = useRef<HTMLDivElement | null>(null);

    const { state, dispatch } = useAppContext();

    const open: boolean = Boolean(anchorEl);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent): void {
            if (searchResultRef.current && !searchResultRef.current.contains(event.target as Node)) {
                setSearchValue('');
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [searchResultRef]);

    const search: ISearch = {
        page: page,
        query: searchValue,
    };

    const {loading, error, data } = useQuery(FILMS_BY_SEARCH_QUERY,
        {variables: {search}, skip: !searchValue});

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleNavSearch = (): void => {
        setSearchValue('');
    };

    const handleClose = (): void => {
        setAnchorEl(null);
    };

    const handleSearch = (value: string): void => {
        setSearchValue(value);
    };

    const handleLanguageClick = (language: string) => {
        setLanguage(language);
        handleClose();
    };

    const setLanguage = useCallback((locale: string) => {
        dispatch({
            type: 'setLocale',
            locale,
        });
    }, []);

    if (error) {
        return <DataError/>;
    }

    const languageMenu = () => (
        <Menu
            id="fade-menu"
            MenuListProps={{
                'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
        >
            <MenuItem disabled={state.locale === LOCALES.ENGLISH}
                      sx={{ my: 1 }}
                      onClick={() =>
                          handleLanguageClick(LOCALES.ENGLISH)}>
                ENG
            </MenuItem>
            <MenuItem disabled={state.locale === LOCALES.UKRAINIAN}
                      sx={{ my: 1 }}
                      onClick={() => handleLanguageClick(LOCALES.UKRAINIAN)}>
                UKR
            </MenuItem>
            <MenuItem disabled={state.locale === LOCALES.SPANISH}
                      sx={{ my: 1 }}
                      onClick={() => handleLanguageClick(LOCALES.SPANISH)}>
                ES
            </MenuItem>
            <MenuItem disabled={state.locale === LOCALES.RUSSIAN}
                      sx={{ my: 1 }}
                      onClick={() => handleLanguageClick(LOCALES.RUSSIAN)}>
                RU
            </MenuItem>
            <MenuItem disabled={state.locale === LOCALES.GERMAN}
                      sx={{ my: 1 }}
                      onClick={() => handleLanguageClick(LOCALES.GERMAN)}>
                DE
            </MenuItem>
        </Menu>
    );

    const burgerList = () => (
        <Box sx={{ width: 190, ml: 3 }} role="presentation">
            <List sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Link component={RouterLink} to="account">
                    <Button size="large"
                            startIcon={<AccountCircleIcon/>}
                            onClick={() => setDrawerOpen(false)}>
                        <FormattedMessage id="navigation.account"/>
                    </Button>
                </Link>
                <>
                    <Button size="large"
                            startIcon={<LanguageIcon/>}
                            aria-controls={open ? 'fade-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}>
                        <FormattedMessage id="navigation.language"/>
                    </Button>
                    {languageMenu()}
                </>
                <Link component={RouterLink} to="search">
                    <Button size="large"
                            startIcon={<SearchIcon/>}
                            onClick={() => setDrawerOpen(false)}>
                        <FormattedMessage id="navigation.search"/>
                    </Button>
                </Link>
                <Link component={RouterLink} to="genres">
                    <Button size="large"
                            onClick={() => setDrawerOpen(false)}>
                        <FormattedMessage id="navigation.genres"/>
                    </Button>
                </Link>
            </List>
        </Box>
    );

    return (
        <>
            <Box sx={{ flexGrow:1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Box sx={{display: {
                                xs: 'block', lg: 'none', xl: 'none', xxl: 'none'} }} >
                            <IconButton
                                onClick={() => setDrawerOpen(true)}
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                        <Link component={RouterLink} to="/" sx={{ flexGrow: 1 }}>
                            <Typography variant="h4" component="div" sx={{
                                color:  theme.palette.primary.contrastText,
                                flexGrow: 1,
                            }}>
                                <FormattedMessage id="navigation.home"/>
                            </Typography>
                        </Link>
                        <Box sx={{display: {
                                xs: 'none', sm: 'none',
                                md: 'none', lg: 'flex',
                                xl: 'flex', xxl: 'flex'},
                            alignItems: 'center'}}>
                            <Box>
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Search…"
                                        inputProps={{ 'aria-label': 'search' }}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            handleSearch(e.target.value)}
                                        value={searchValue}
                                    />
                                </Search>
                                {searchValue && (
                                    <SearchResultBox ref={searchResultRef} className="box" sx={{boxShadow: 3}}>
                                        {loading ? <Loading/> : !data?.filmsBySearchQuery.totalResults ?
                                            <Typography sx={{color: theme.palette.text.primary}}>
                                                No results
                                            </Typography>
                                            : <Box sx={{ flexGrow: 1, mb: 8, p: 2 }}>
                                                {data && (
                                                    <Grid sx={{display: 'flex', flexDirection: 'column'}}
                                                          container spacing={2}>
                                                        {data.filmsBySearchQuery.results.map((film: IFilm) => (
                                                            <Grid key={film.id} item xs={12} sm={6} md={4} lg={10}>
                                                                <CardFilmSearch film={film}/>
                                                            </Grid>
                                                        ))}
                                                        <Box sx={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            marginTop: '20px'}} >
                                                            <RouterLink to={`search?title=${searchValue}`}>
                                                                <Button onClick={handleNavSearch} sx={{width: '180px'}}
                                                                        variant="contained">
                                                                    See more
                                                                </Button>
                                                            </RouterLink>
                                                        </Box>
                                                    </Grid>
                                                )}
                                            </Box>
                                        }
                                    </SearchResultBox>
                                )}
                            </Box>
                            <Button component={RouterLink}
                                    to="genres"
                                    size="large"
                                    sx={{ margin: 2, pt: 1.5, color:
                                        theme.palette.primary.contrastText, display: 'block',
                                    }}>
                                <FormattedMessage id="navigation.genres" />
                            </Button>
                            <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center' }}>
                                <Button component={RouterLink}
                                        to="account"
                                        size="large"
                                        startIcon={<AccountCircleIcon
                                            sx={{
                                                color: theme.palette.primary.contrastText,
                                                width: '28px', height: '28px'}}/>}
                                        sx={{
                                            width: '42px', height: '42px',
                                            display: 'block',
                                        }}>
                                </Button>
                            </Box>
                            <Button
                                startIcon={<LanguageIcon sx={{
                                    color: theme.palette.primary.contrastText,
                                    width: '28px', height: '28px'}}/>}
                                size="large"
                                sx={{
                                    width: '42px', height: '42px',
                                    display: 'block',
                                }}
                                aria-controls={open ? 'fade-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}>
                            </Button>
                            {languageMenu()}
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={() => setDrawerOpen(false)}>
                {burgerList()}
            </Drawer>
        </>
    );
};

export default Navigation;