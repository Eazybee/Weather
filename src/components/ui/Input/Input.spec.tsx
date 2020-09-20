/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, act } from '<mocks>/testUtils';
import { cities, apiResponse } from '<mocks>/index';
import CitiesProvider from '<contexts>/Cities';
import request from '<helpers>/request';
import { City } from '<helpers>/typings';
import { LocalStoragePointer } from '<configs>/constants';
import MockInput from '<mocks>/MockInput';
import Input from '.';


let props: City[];
const push = jest.fn();
const promise = Promise.resolve();

jest.mock('react-select/async', () => MockInput);
jest.mock('react-router-dom', () => ({ useHistory: () => ({ push }) }));
jest.useFakeTimers();


describe('Input', () => {
  beforeAll(() => {
    props = cities;
  });

  beforeEach(() => {
    localStorage.setItem(LocalStoragePointer, JSON.stringify(props));
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render', async () => {
    const { getByPlaceholderText } = render(
      <CitiesProvider>
        <Input />
      </CitiesProvider>,
    );

    jest.runAllTimers();
    await act(() => promise);

    expect(getByPlaceholderText('Tokyo')).toBeTruthy();
  });

  it('should return search option found', async () => {
    const { getByPlaceholderText, getByText } = render(
      <CitiesProvider>
        <Input />
      </CitiesProvider>,
    );

    jest.runAllTimers();
    await act(() => promise);

    fireEvent.change(
      getByPlaceholderText('Tokyo'),
      { target: { value: props[0].location.name } },
    );

    jest.runAllTimers();
    await act(() => promise);

    expect(getByText(props[0].location.name)).toBeTruthy();
  });

  it('should return search option found', async () => {
    const { getByPlaceholderText, getByText } = render(
      <CitiesProvider>
        <Input />
      </CitiesProvider>,
    );

    fireEvent.change(
      getByPlaceholderText('Tokyo'),
      { target: { value: props[0].location.name } },
    );

    jest.runAllTimers();
    await act(() => promise);

    expect(getByText(props[0].location.name)).toBeTruthy();
    expect(getByPlaceholderText('Tokyo').nextSibling?.textContent)
      .toEqual(props[0].location.name);
  });

  it('should clear option found when input is empty', async () => {
    const { getByPlaceholderText, queryByText } = render(
      <CitiesProvider>
        <Input />
      </CitiesProvider>,
    );

    fireEvent.change(
      getByPlaceholderText('Tokyo'),
      { target: { value: props[0].location.name } },
    );

    jest.runAllTimers();
    await act(() => promise);

    fireEvent.change(
      getByPlaceholderText('Tokyo'),
      { target: { value: ' ' } },
    );

    jest.runAllTimers();
    await act(() => promise);

    expect(queryByText(props[0].location.name)).toBeFalsy();
    expect(getByPlaceholderText('Tokyo').nextSibling).toBeFalsy();
  });

  it('should not return search option found', async () => {
    const { getByPlaceholderText, queryByText } = render(
      <CitiesProvider>
        <Input />
      </CitiesProvider>,
    );

    // @ts-ignore
    request = jest.fn().mockImplementationOnce(() => ({ error: 'not found oops!' }));

    fireEvent.change(
      getByPlaceholderText('Tokyo'),
      { target: { value: 'random text' } },
    );

    jest.runAllTimers();
    await act(() => promise);

    expect(queryByText('random text')).toBeFalsy();
    expect(getByPlaceholderText('Tokyo').nextSibling).toBeFalsy();
  });

  it('should return search option found from api request', async () => {
    const data = apiResponse;
    data.location.name = 'Japan';
    // @ts-ignore
    request = jest.fn().mockImplementation(() => ({ data }));
    const { getByPlaceholderText, queryByText } = render(
      <CitiesProvider>
        <Input />
      </CitiesProvider>,
    );

    fireEvent.change(
      getByPlaceholderText('Tokyo'),
      { target: { value: 'Japan' } },
    );

    jest.runAllTimers();
    await act(() => promise);

    expect(queryByText('Japan')).toBeTruthy();
    expect(getByPlaceholderText('Tokyo').nextSibling?.textContent).toEqual('Japan');
  });


  it('should go to info page when option is selected', async () => {
    const data = apiResponse;
    // @ts-ignore
    request = jest.fn().mockImplementation(() => ({ data }));
    data.location.name = 'Japan';

    const { getByPlaceholderText, getByText } = render(
      <CitiesProvider>
        <Input />
      </CitiesProvider>,
    );

    fireEvent.change(
      getByPlaceholderText('Tokyo'),
      { target: { value: 'Japan' } },
    );

    jest.runAllTimers();
    await act(() => promise);

    fireEvent.click(getByText('Japan'));

    expect(push).toHaveBeenCalled();
  });
});
