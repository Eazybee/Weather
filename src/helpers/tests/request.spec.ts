/* eslint-disable prefer-promise-reject-errors */
import isEqual from 'lodash.isequal';
import request from '<helpers>/request';
import api from '<configs>/api';
import getApiResponse from '<mocks>/index';


jest.mock('<configs>/api', () => ({
  get: jest.fn(() => Promise.resolve({
    data: getApiResponse(),
  })),
}));

describe('Request', () => {
  it('should fetch data', async () => {
    const response = await request('get', {});
    const data = getApiResponse();

    expect(isEqual({ data }, response)).toBeTruthy();
  });

  it('should bounce on multiple request', async () => {
    const [response1, response2, response3, response4] = await Promise.allSettled([
      request('get', {}),
      request('get', {}),
      request('get', {}),
      request('get', {}),
    ]);


    expect(response1.status).toEqual('rejected');
    expect(response2.status).toEqual('rejected');
    expect(response3.status).toEqual('rejected');
    expect(response4.status).toEqual('fulfilled');
  });

  it('should reject with server error', async () => {
    // @ts-ignore
    api.get.mockImplementationOnce(() => Promise.reject({
      response: {
        data: 'server error',
      },
    }));

    const response = await request('get', {});


    expect(response.error).toEqual('server error');
  });
});
