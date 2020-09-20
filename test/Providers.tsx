import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import CitiesProvider from '<contexts>/Cities';
import HeaderProvider from '<contexts>/Header';


const Providers = ({ children }: { children: JSX.Element }) => (
  <CitiesProvider>
    <MemoryRouter
      initialEntries={['/']}
    >
      <HeaderProvider>{children}</HeaderProvider>
    </MemoryRouter>
  </CitiesProvider>
);

export default Providers as React.ComponentType<{}>;
