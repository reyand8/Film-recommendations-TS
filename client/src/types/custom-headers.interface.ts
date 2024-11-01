export interface ICustomHeaders {
    locale: string;
    authorization?: string;
    [key: string]: string | undefined;
}