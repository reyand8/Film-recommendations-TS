import { Route, Routes } from 'react-router-dom';

import { ROUTES } from '../utils/routes';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import SingleFilm from '../pages/SingleFilm';
import Genres from '../pages/Genres';
import FilmsByGenre from '../pages/FilmsByGenre';
import Search from '../pages/Search';
import Account from '../pages/Account';
import Recommend from '../pages/Recommend';


const AppRoutes = () => (
    <Routes>
        <Route index element={<Home />} />
        <Route path={ROUTES.FILM} element={<SingleFilm />} />
        <Route path={ROUTES.GENRES} element={<Genres />} />
        <Route path={ROUTES.FILMS_BY_GENRE} element={<FilmsByGenre />} />
        <Route path={ROUTES.SEARCH} element={<Search />} />
        <Route path={ROUTES.RECOMMEND} element={<Recommend />} />
        <Route path={ROUTES.ACCOUNT} element={<Account />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
);

export default AppRoutes;