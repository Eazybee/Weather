import React, { Suspense } from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import { css } from 'styled-components';
import Header from '<components>/resuableSections/Header';
import LoadingSpinner from '../ui/LoadingSpinner';
import routeData from './data';
import HeaderProvider from '<contexts>/Header';

const Routes = () => (
  <Router>
    <Suspense
      fallback={(
        <LoadingSpinner
          styles={css`
            position: fixed;
            top: 50%;
            right: 50%;
            margin-left: 30;
            margin-bottom: 30;
          `}
        />
      )}
    >
      <HeaderProvider>
        <Header />
        <Switch>
          {routeData.default.map(({ exact, path, Component }) => (
            <Route key={path} exact={exact} path={path} component={Component} />
          ))}
          <Route
            path="*"
            render={({ location }) => (
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: location },
                }}
              />
            )}
          />
        </Switch>
      </HeaderProvider>
    </Suspense>
  </Router>
);

export default Routes;
