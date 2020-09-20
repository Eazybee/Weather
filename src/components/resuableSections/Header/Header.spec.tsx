import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, act } from '<mocks>/testUtils';
import Header from '.';
import * as request from '<helpers>/request';
import { cities } from '<mocks>/index';
import Provider from '<mocks>/Providers';
import { City } from '<helpers>/typings';
import { LocalStoragePointer } from '<configs>/constants';


jest.useFakeTimers();

const HeaderWrapper = () => (
  <Provider><Header /></Provider>
);
const promise = Promise.resolve();
let props: City[];

cities.sort((
  a, b,
) => (a.location.name.toLowerCase() > b.location.name.toLowerCase() ? 1 : -1));

describe('Header', () => {
  beforeAll(() => {
    // @ts-ignore
    navigator.geolocation = null;
  });


  it('should render loading aft and weather', async () => {
    localStorage.removeItem(LocalStoragePointer);
    const firstCity = cities[0];
    const mockRequest = jest.spyOn(request, 'requestApi')
      .mockImplementation(() => Promise.reject());
    const { getByText, queryByText } = render(<HeaderWrapper />, {});

    jest.runAllTimers();
    await act(() => promise);

    expect(getByText('Weather')).toBeTruthy();
    expect(getByText('Loading...')).toBeTruthy();
    expect(queryByText(firstCity.location.country)).toBeFalsy();
    expect(queryByText(firstCity.location.region)).toBeFalsy();
    expect(queryByText(`${firstCity.current.temperature}`)).toBeFalsy();
    mockRequest.mockRestore();
  });

  it('should render first city weather info', async () => {
    props = cities;
    const firstCity = props[0];
    localStorage.setItem(LocalStoragePointer, JSON.stringify(props));

    const { getByText, queryByText } = render(<HeaderWrapper />, {});
    jest.runAllTimers();
    await act(() => promise);

    expect(getByText('Weather')).toBeTruthy();
    expect(queryByText('Loading...')).toBeFalsy();
    expect(getByText(firstCity.location.country)).toBeTruthy();
    expect(getByText(firstCity.location.name)).toBeTruthy();
    expect(getByText(`${firstCity.current.temperature}`)).toBeTruthy();
  });
});
