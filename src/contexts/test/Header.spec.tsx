import React, { useContext } from 'react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { render, act } from '@testing-library/react';
import CitiesProvider from '../Cities';
import * as request from '<helpers>/request';
import HeaderProvider, { HeaderContext } from '../Header';
import { LocalStoragePointer } from '<configs>/constants';
import { City } from '<helpers>/typings';
import { cities, getApiResponse } from '<mocks>/index';


const MockComponent = () => {
  const { state } = useContext(HeaderContext);

  return (
    <div>
      {state.homeCity && (
        <>
          <p>{state.homeCity.location.name}</p>
          <p>{state.homeCity.location.country}</p>
          <p>{state.homeCity.current.temperature}</p>
        </>
      )}
    </div>
  );
};

let props: City[];

cities.sort((
  a, b,
) => (a.location.name.toLowerCase() > b.location.name.toLowerCase() ? 1 : -1));

const Provider = ({ children }: any) => (
  <CitiesProvider>
    <MemoryRouter
      initialEntries={['/']}
    >
      <HeaderProvider>{children}</HeaderProvider>
    </MemoryRouter>
  </CitiesProvider>
);

jest.useFakeTimers();
const promise = Promise.resolve();


describe('HeaderContext Provider', () => {
  beforeEach(() => {
    props = cities;
    localStorage.setItem(LocalStoragePointer, JSON.stringify(props));

    // @ts-ignore
    navigator.geolocation = {
      getCurrentPosition: (cb: (obj: Record<string, any>) => void) => {
        cb({
          coords: {
            latitude: 34,
            longitude: 74,
          },
        });
      },
    };
  });

  it('should show user location on homepage if navigation is supported and redirect to /info page', async () => {
    const user = {
      cityName: 'Lagos',
      country: 'Nigeria',
      temperature: 32,
    };
    const requestMock = jest.spyOn(request, 'requestApi').mockImplementation(
      () => {
        const { data } = getApiResponse();
        data.current.temperature = user.temperature;
        data.location.country = user.country;
        data.location.name = user.cityName;
        return Promise.resolve({ data });
      },
    );


    const { getByText } = render(<Provider><MockComponent /></Provider>);
    await act(() => promise);
    jest.runAllTimers();
    await act(() => promise);

    expect(getByText(user.cityName)).toBeTruthy();
    expect(getByText(user.country)).toBeTruthy();
    expect(getByText(user.temperature.toString())).toBeTruthy();

    requestMock.mockRestore();
  });


  it('should show first city on homepage if navigation is not supported', async () => {
    // @ts-ignore
    navigator.geolocation = null;
    const firstCity = props[0];

    const { getByText } = render(<Provider><MockComponent /></Provider>);
    await act(() => promise);
    jest.runAllTimers();
    await act(() => promise);

    expect(getByText(firstCity.location.name)).toBeTruthy();
    expect(getByText(firstCity.location.country)).toBeTruthy();
    expect(getByText(firstCity.current.temperature.toString())).toBeTruthy();
  });
});
