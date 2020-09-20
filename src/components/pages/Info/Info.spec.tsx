import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, act } from '<mocks>/testUtils';
import Info from '.';
import * as request from '<helpers>/request';
import { cities } from '<mocks>/index';
import CitiesProvider from '<contexts>/Cities';
import HeaderProvider from '<contexts>/Header';
import { City } from '<helpers>/typings';
import { LocalStoragePointer } from '<configs>/constants';


jest.useFakeTimers();
const state = { index: 0 };
const history = { push: jest.fn };

jest.mock('react-router-dom', () => ({
  useHistory: () => history,
  useLocation: () => ({
    location: { pathname: '/info' },
    state,
  }),
}));


const InfoWrapper = () => (
  <CitiesProvider>
    <HeaderProvider><Info /></HeaderProvider>
  </CitiesProvider>
);
const promise = Promise.resolve();
let props: City[];

cities.sort((
  a, b,
) => (a.location.name.toLowerCase() > b.location.name.toLowerCase() ? 1 : -1));

describe('Header', () => {
  it('should redirect back to HomePage', async () => {
    localStorage.removeItem(LocalStoragePointer);
    const mockRequest = jest.spyOn(request, 'requestApi')
      .mockImplementation(() => Promise.reject());
    const { getByText } = render(<InfoWrapper />, {});

    jest.runAllTimers();
    await act(() => promise);

    expect(getByText('Loading...')).toBeTruthy();
    mockRequest.mockRestore();
  });

  it('should render table and Notes section', async () => {
    props = cities;
    localStorage.setItem(LocalStoragePointer, JSON.stringify(props));

    const { getByText } = render(<InfoWrapper />, {});

    jest.runAllTimers();
    await act(() => promise);

    expect(getByText(props[0].current.pressure.toString())).toBeTruthy();
  });
});
