import React from 'react';
import { ThemeProvider } from 'styled-components';
import CitiesProvider from '../contexts/Cities';
import useTheme, { ThemeType } from '<hooks>/useTheme';
import GlobalStyle from '../styles/Global';
import ErrorBoundary from '<components>/ui/ErrorBoundary';
import Routes from './Routes';

const App = () => {
  const { theme } = useTheme() as { theme: ThemeType };

  return (
    <>
      {theme?.colors && (
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <ErrorBoundary>
            <CitiesProvider>
              <Routes />
            </CitiesProvider>
          </ErrorBoundary>
        </ThemeProvider>
      )}
    </>
  );
};

export default App;
