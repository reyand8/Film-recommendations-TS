import { PrismaClient } from '@prisma/client';

import { getDetails, discoverFilm, getPopular, getFilmsByGenre, getFilmsBySearchQuery } from '../modules/films';
import { Film } from '../modules/films/entities/Film';
import { getList } from '../modules/genres';

import { IContext, IFilmsByFilterArgs, IFilmsByGenreArgs,
    IFilmsByIdArgs, IFilmsByPopularityArgs, IFilmsBySearchQueryArgs }
    from '../types/query.interface';

const prisma = new PrismaClient();


const Query = {

    filmsByFilter: async (parent: unknown, args: IFilmsByFilterArgs, { locale }: IContext) => {
        return discoverFilm(args.filter, locale);
    },

    filmsBySearchQuery: async (parent: unknown, args: IFilmsBySearchQueryArgs, { locale }: IContext) => {
        return getFilmsBySearchQuery(args.search, locale);
    },

    filmsByPopularity: async (parent: unknown, args: IFilmsByPopularityArgs, { locale }: IContext) => {
        return getPopular(args.page, locale);
    },

    filmsByGenre: async (parent: unknown, args: IFilmsByGenreArgs, { locale }: IContext) => {
        return getFilmsByGenre(args.filter, locale);
    },

    filmsById: async (parent: unknown, { ids }: IFilmsByIdArgs, { locale }: IContext) => {
        const requests = ids.map((id: string) => getDetails(id, locale));
        const data = await Promise.all(requests);
        return data.map(({ data }) => new Film(data));
    },

    genres: async (_: unknown, __: unknown, { locale }: IContext) => {
        return getList(locale);
    },

    user: async (parent: unknown, args: unknown, context: IContext) => {
        return prisma.user.findUnique({
            where: {
                id: context.userId,
            },
        });
    },
};

export default Query;