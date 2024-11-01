import React, {useReducer, createContext, useContext} from 'react';

import {useDefaultContext} from './defaultContext';
import {saveToStorage} from '../../utils/localStorage';
import { STORAGE_LOCALE_KEY} from '../../common/const';
import {IDefaultContextType} from '../../types/app-context-default.interface';
import {IAppAction, IAppContextProviderProps, IAppContextType, IAppState} from '../../types/app-context.interface';

const AppContext = createContext<IAppContextType | undefined>(undefined);


let reducer = (state: IAppState, action: IAppAction) => {
    switch (action.type) {
        case 'setLocale':
            saveToStorage(STORAGE_LOCALE_KEY, action.locale);
            return { ...state, locale: action.locale };
        default:
            return state;
    }
};

const useAppContext = (): IAppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppContext.Provider");
    }
    return context;
};

const AppContextProvider: React.FC<IAppContextProviderProps> = ({children}) => {
    const defaultContext: IDefaultContextType = useDefaultContext();
    const [state, dispatch] = useReducer(reducer, defaultContext);
    const value = { state, dispatch };
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export { useAppContext, AppContextProvider };