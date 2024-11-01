import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { APP_SECRET } from '../utils';
import { IContext, ISignInArgs, ISignUpArgs, IUpdateUserArgs } from '../types/mutation.interface';

const prisma = new PrismaClient();

const Mutation = {

    signUpUser: async (parent: unknown, args: ISignUpArgs, context: IContext) => {
        const password: string = await bcrypt.hash(args.password, 10);
        const user = await context.prisma.user.create({
            data: { ...args, password },
        });
        const token: string = jwt.sign({ userId: user.id }, APP_SECRET);

        return { token, user };
    },

    signInUser: async (parent: unknown, { email, password }: ISignInArgs, context: IContext) => {
        const user = await context.prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new Error('No such user found');
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            throw new Error('Invalid password');
        }

        const token = jwt.sign({ userId: user.id }, APP_SECRET);

        return { token, user };
    },

    deleteUser: async (parent: unknown, args: unknown, context: IContext) => {
        const userId = context.userId;
        if (!userId) {
            throw new Error('Not authenticated');
        }
        try {
            await context.prisma.user.delete({
                where: { id: userId },
            });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },

    updateUser: async (parent: unknown, { email, username, selectedFilms }: IUpdateUserArgs, context: IContext) => {
        const userId = context.userId;

        const data: {
            email?: { set: string };
            username?: { set: string };
            selectedFilms?: string | null;
        } = {};

        if (email) {
            data.email = { set: email };
        }
        if (username) {
            data.username = { set: username };
        }
        if (selectedFilms) {
            data.selectedFilms = JSON.stringify(selectedFilms);
        }

        return context.prisma.user.update({
            where: { id: userId },
            data,
        });
    },
};

export default Mutation;