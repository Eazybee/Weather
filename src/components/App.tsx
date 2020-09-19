import React from 'react';
import CitiesProvider from '../contexts/Cities';
import GlobalStyle from '../styles/Global';
import ErrorBoundary from '<components>/ui/ErrorBoundary';
import Routes from './Routes';

const App = () => (
  <>
    <GlobalStyle />
    <ErrorBoundary>
      <CitiesProvider>
        <Routes />
      </CitiesProvider>
    </ErrorBoundary>
  </>
);

export default App;
