import React, {Dispatch} from 'react';

export interface IAppState {
    locale: string;
    selectedFilmsId: string[];
}

export interface IAppContextType {
    state: IAppState;
    dispatch: Dispatch<IAppAction>;
}

export interface IAppAction {
    type: string;
    locale: string;

}

export interface IAppContextProviderProps {
    children: React.ReactNode;
}