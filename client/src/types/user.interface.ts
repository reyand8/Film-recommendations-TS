export interface IFormUser {
    username?: string;
    email: string;
    password: string;
}

export interface IFormAccUser {
    username: string;
    email: string;
    password: string;
}

export interface IUser {
    email: string;
    username: string;
}

export interface IProfileProps {
    data: {
        user: IUser
    };
    numberOfFilms: number[];
}

export interface IUserSelectedFilms {
    username: string;
    email: string;
    selectedFilms: string;
}

export interface IUserData {
    user: {
        username: string;
        email: string;
        selectedFilms: string;
    };
}

export interface IFormFilmsValues {
    listName?: string;
}