import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import './index.css';
import App from './App';
import {AppContextProvider} from './providers/appContext';

const root: ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <BrowserRouter>
          <AppContextProvider>
            <App />
          </AppContextProvider>
      </BrowserRouter>
  </React.StrictMode>
);