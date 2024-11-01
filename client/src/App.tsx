import React from 'react';
import {CssBaseline, Container, Box, ThemeProvider} from '@mui/material';
import {ApolloClient, ApolloProvider, ApolloLink, from,
  HttpLink, InMemoryCache, NormalizedCacheObject} from '@apollo/client';

import theme from './assets/theme';
import {CustomHeaders} from './types/custom-headers.interface';
import { useAppContext } from './providers/appContext';
import I18nProvider from './providers/i18n';
import Navigation from './components/navigation';
import AppRoutes from './routes';


function App() {
  const { state } = useAppContext();
  const httpLink: HttpLink = new HttpLink({uri: 'http://localhost:4000/graphql'})
  const token: string | null =  localStorage.getItem('auth-token');

  const localeMiddleware : ApolloLink = new ApolloLink((operation, forward) => {
    const customHeaders: CustomHeaders = operation.getContext().hasOwnProperty('headers')
        ? operation.getContext().headers
        : {};
    operation.setContext({
      headers: {
        ...customHeaders,
        locale: state.locale,
        authorization: token ? `Bearer ${token}` : '',
      },
    });
    return forward(operation);
  });

  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    link: from([localeMiddleware, httpLink]),
    cache: new InMemoryCache(),
  });

  return (
      <I18nProvider locale={state.locale}>
        <ApolloProvider client={client}>
          <CssBaseline />
          <ThemeProvider theme={theme}>
            <Box>
              <Navigation />
              <Container maxWidth="xl">
                <AppRoutes />
              </Container>
            </Box>
          </ThemeProvider>
        </ApolloProvider>
      </I18nProvider>
  );
}

export default App;