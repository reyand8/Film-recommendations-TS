import {useSearchParams} from 'react-router-dom';

import {getFromStorage} from '../../utils/localStorage';
import {LOCALES, STORAGE_LOCALE_KEY, STORAGE_SELECTED_FILMS_KEY} from '../../common/const';
import {IDefaultContextType} from '../../types/app-context-default.interface';

export const useDefaultContext = (): IDefaultContextType => {
    const [ searchParams ] = useSearchParams();
    return {
        locale: getFromStorage<string>(STORAGE_LOCALE_KEY) || searchParams.get('locale') || LOCALES.ENGLISH,
        selectedFilmsId: getFromStorage<string[]>(STORAGE_SELECTED_FILMS_KEY) || [],
    };
};