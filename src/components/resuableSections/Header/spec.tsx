import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, act } from '<helpers>/testUtils/testUtils';
import Header from '.';
import request from '<helpers>/request';
import getApiResponse from '<mocks>/index';
import DebounceError from '<helpers>/DebounceError';


const promise = Promise.resolve();
jest.mock('<helpers>/request', () => jest.fn(() => Promise.resolve(getApiResponse()))
  .mockImplementationOnce(() => Promise.reject(new DebounceError('test error'))));


describe('Header', () => {
  beforeEach(() => {
    // Testing our catch block will trigger console.error. This makes the test output noisy,
    // so we'll mock out console.error
    jest.spyOn(console, 'error');
    // @ts-ignore
    console.error.mockImplementation(() => {});
  });

  afterEach(() => {
    // @ts-ignore
    console.error.mockRestore();
  });

  it('should render loading and weather', async () => {
    const { getByText, queryByText } = render(<Header />, {});
    const data = getApiResponse();


    expect(getByText('Weather')).toBeTruthy();
    expect(getByText('Loading...')).toBeTruthy();
    expect(queryByText(data.data.location.country)).toBeFalsy();
    expect(queryByText(data.data.location.region)).toBeFalsy();
    expect(queryByText(`${data.data.current.temperature}`)).toBeFalsy();
  });

  it('should render largest cites when geolocation is not supported', async () => {
    const { getByText, queryByText } = render(<Header />, {});

    await act(() => promise);
    const data = getApiResponse();

    expect(getByText('Weather')).toBeTruthy();
    expect(queryByText('Loading...')).toBeFalsy();
    expect(queryByText(data.data.location.country)).toBeTruthy();
    expect(queryByText(data.data.location.region)).toBeTruthy();
    expect(queryByText(`${data.data.current.temperature}`)).toBeTruthy();
  });

  it('should render user cites when geolocation is supported', async () => {
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

    const { getByText, queryByText } = render(<Header />, {});

    await act(() => promise);
    const data = getApiResponse();


    expect(getByText('Weather')).toBeTruthy();
    expect(queryByText('Loading...')).toBeFalsy();
    expect(queryByText(data.data.location.country)).toBeTruthy();
    expect(queryByText(data.data.location.region)).toBeTruthy();
    expect(queryByText(`${data.data.current.temperature}`)).toBeTruthy();

    // @ts-ignore
    navigator.geolocation = undefined;
  });

  it('should render largest cites when geolocation is supported not denied', async () => {
    // @ts-ignore
    navigator.geolocation = {
      getCurrentPosition: (_cb: any, errorCallBack: () => void) => {
        errorCallBack();
      },
    };

    const { getByText, queryByText } = render(<Header />, {});

    await act(() => promise);
    const data = getApiResponse();


    expect(getByText('Weather')).toBeTruthy();
    expect(queryByText('Loading...')).toBeFalsy();
    expect(queryByText(data.data.location.country)).toBeTruthy();
    expect(queryByText(data.data.location.region)).toBeTruthy();
    expect(queryByText(`${data.data.current.temperature}`)).toBeTruthy();

    // @ts-ignore
    navigator.geolocation = undefined;
  });

  it('should render rainy day background when humidity is high', async () => {
    const data = getApiResponse();
    data.data.current.humidity = 95;
    // @ts-ignore
    request.mockImplementationOnce(() => Promise.resolve(data));
    const { getByText, queryByText } = render(<Header />, {});
    await act(() => promise);


    expect(getByText('Weather')).toBeTruthy();
    expect(queryByText('Loading...')).toBeFalsy();
  });

  it('should render rainy day background when "25 < temperature > 19" ', async () => {
    const data = getApiResponse();
    data.data.current.temperature = 22;
    // @ts-ignore
    request.mockImplementationOnce(() => Promise.resolve(data));
    const { getByText, queryByText } = render(<Header />, {});
    await act(() => promise);


    expect(getByText('Weather')).toBeTruthy();
    expect(queryByText('Loading...')).toBeFalsy();
  });

  it('should render cloudy day background when "29 < temperature > 24" ', async () => {
    const data = getApiResponse();
    data.data.current.temperature = 25;
    // @ts-ignore
    request.mockImplementationOnce(() => Promise.resolve(data));
    const { getByText, queryByText } = render(<Header />, {});
    await act(() => promise);


    expect(getByText('Weather')).toBeTruthy();
    expect(queryByText('Loading...')).toBeFalsy();
  });

  it('should render cloudy day background when "temperature > 28" ', async () => {
    const data = getApiResponse();
    data.data.current.temperature = 30;
    // @ts-ignore
    request.mockImplementationOnce(() => Promise.resolve(data));
    const { getByText, queryByText } = render(<Header />, {});
    await act(() => promise);


    expect(getByText('Weather')).toBeTruthy();
    expect(queryByText('Loading...')).toBeFalsy();
  });
});
