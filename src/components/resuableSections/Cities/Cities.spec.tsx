import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, act, fireEvent } from '<mocks>/testUtils';
import Cities from '.';
import * as request from '<helpers>/request';
import { cities } from '<mocks>/index';
import MockInput from '<mocks>/MockInput';
import Provider from '<mocks>/Providers';
import { City } from '<helpers>/typings';
import { LocalStoragePointer } from '<configs>/constants';


jest.useFakeTimers();
jest.mock('react-select/async', () => (prop: any) => <MockInput {...prop} />);

const CitiesWrapper = () => (
  <Provider><Cities /></Provider>
);
const promise = Promise.resolve();
let props: City[];

cities.sort((
  a, b,
) => (a.location.name.toLowerCase() > b.location.name.toLowerCase() ? 1 : -1));

describe('Cities', () => {
  beforeAll(() => {
    // @ts-ignore
    navigator.geolocation = null;
  });

  it('should render input only when cities are not available', async () => {
    localStorage.removeItem(LocalStoragePointer);
    const firstCity = cities[0];
    const mockRequest = jest.spyOn(request, 'requestApi')
      .mockImplementation(() => Promise.reject());
    const { getByPlaceholderText, queryByText, container } = render(<CitiesWrapper />, {});

    jest.runAllTimers();
    await act(() => promise);

    expect(getByPlaceholderText('Tokyo')).toBeTruthy();
    expect(container.firstChild?.lastChild).toHaveAttribute('class', 'fle full');
    expect(queryByText(firstCity.location.country)).toBeFalsy();
    mockRequest.mockRestore();
  });

  it('should render cities once available', async () => {
    props = cities;
    localStorage.setItem(LocalStoragePointer, JSON.stringify(props));
    const { getByPlaceholderText, queryByText } = render(<CitiesWrapper />, {});

    const firstCity = cities[0];
    jest.runAllTimers();
    await act(() => promise);

    expect(getByPlaceholderText('Tokyo')).toBeTruthy();
    expect(queryByText(firstCity.location.name)).toBeTruthy();
    props.forEach((city) => {
      expect(queryByText(city.location.name)).toBeTruthy();
    });
  });

  it('should render loading aft and weather', async () => {
    props = cities;
    localStorage.setItem(LocalStoragePointer, JSON.stringify(props));
    const { getByPlaceholderText, queryByText } = render(<CitiesWrapper />, {});

    const firstCity = cities[0];
    jest.runAllTimers();
    await act(() => promise);

    expect(getByPlaceholderText('Tokyo')).toBeTruthy();
    expect(queryByText(firstCity.location.name)).toBeTruthy();
    props.forEach((city) => {
      expect(queryByText(city.location.name)).toBeTruthy();
    });
  });

  it('should like a city', async () => {
    props = cities;
    localStorage.setItem(LocalStoragePointer, JSON.stringify(props));
    const { getByText } = render(<CitiesWrapper />, {});

    const firstCity = cities[0] as City;
    jest.runAllTimers();
    await act(() => promise);

    const likebtn = getByText(firstCity.location.name).previousSibling?.previousSibling?.firstChild;

    if (likebtn) {
      fireEvent.click(likebtn);
    }

    await act(() => promise);
    jest.runAllTimers();

    const myCities = localStorage.getItem(LocalStoragePointer);
    let newState: City[] = [];

    if (myCities) {
      newState = JSON.parse(myCities) as City[];
    }

    expect(newState[0].favorite).toEqual(true);
    expect(newState[0].location.name).toEqual(firstCity.location.name);
    expect(newState[0].favorite).not.toEqual(firstCity.location.name);
  });

  it('should delete a city', async () => {
    props = cities;
    localStorage.setItem(LocalStoragePointer, JSON.stringify(props));
    const { getByText } = render(<CitiesWrapper />, {});

    const firstCity = cities[0];
    jest.runAllTimers();
    await act(() => promise);

    const delButton = getByText(firstCity.location.name)
      .previousSibling?.previousSibling?.lastChild;

    if (delButton) {
      fireEvent.click(delButton);
    }

    await act(() => promise);
    jest.runAllTimers();

    const myCities = localStorage.getItem(LocalStoragePointer);
    let newState: City[] = [];

    if (myCities) {
      newState = JSON.parse(myCities) as City[];
    }

    expect(newState[0].location.name).not.toEqual(firstCity.location.name);
  });
});
