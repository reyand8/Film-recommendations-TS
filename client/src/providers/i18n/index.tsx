import { IntlProvider } from 'react-intl';
import React, { Fragment } from 'react';
import { flatten } from 'flat';

import { LOCALES } from '../../common/const';
import allMessages from '../../messages';
import { IProviderProps } from '../../types/i18.interface';

const Provider: React.FC<IProviderProps> = ({ children, locale = LOCALES.ENGLISH }) => {

    const messages = allMessages[locale] || {};
    const flattenedMessages = flatten(messages) as Record<string, string>;

    return (
        <IntlProvider
            textComponent={Fragment}
            locale={locale}
            messages={flattenedMessages}
        >
            {children}
        </IntlProvider>
    );
};

export default Provider;