import React, { useContext } from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, act } from '@testing-library/react';
import CitiesProvider, { CitiesContext } from '../Cities';
import { cities, getApiResponse } from '<mocks>/index.ts';
import { LocalStoragePointer, Cities } from '<configs>/constants';
import { City } from '<helpers>/typings';
import * as request from '<helpers>/request';


let props: City[];
const promise = Promise.resolve();

jest.useFakeTimers();


const MockComponent = () => {
  const { state } = useContext(CitiesContext);
  return (
    <div>
      {state.map(({ location }) => <p key={location.name}>{location.name}</p>)}
    </div>
  );
};

describe('Cities Provider', () => {
  beforeAll(() => {
    props = cities;
  });

  beforeEach(() => {
    localStorage.setItem(LocalStoragePointer, JSON.stringify(props));
  });


  it('should load cities from api request', async () => {
    localStorage.removeItem(LocalStoragePointer);
    const mock = jest.spyOn(request, 'requestApi').mockImplementation(
      (_meth, { query }) => {
        const { data } = getApiResponse();
        data.location.name = query;
        return Promise.resolve({ data });
      },
    );


    const { getByText } = render(
      <CitiesProvider>
        <MockComponent />
      </CitiesProvider>,
    );

    jest.runAllTimers();
    await act(() => promise);

    Cities.forEach((city) => {
      expect(getByText(city)).toBeTruthy();
    });

    mock.mockRestore();
  });

  it('should load cities from browser and update', async () => {
    const { getByText } = render(
      <CitiesProvider>
        <MockComponent />
      </CitiesProvider>,
    );

    jest.runAllTimers();
    await act(() => promise);

    props.forEach((city) => {
      expect(getByText(city.location.name)).toBeTruthy();
    });
  });
});
