import {PrismaClient} from "@prisma/client";

export interface IContext {
    userId: string;
    prisma: PrismaClient;
}

export interface ISignUpArgs {
    email: string;
    username: string;
    password: string;
}

export interface ISignInArgs {
    email: string;
    password: string;
}

export interface IUpdateUserArgs {
    email?: string;
    username?: string;
    selectedFilms?: string[];
}