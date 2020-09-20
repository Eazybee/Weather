import isEqual from 'lodash.isequal';
import { Request, ApiRequestMethodType } from './typings';
import { RequestDebounceTime } from '<configs>/constants';
import api from '<configs>/api';
import DebounceError from './DebounceError';

const urlsRequested: { apiMethod: string; option: Record<string, any> }[] = [];

const debounce = async (
  option: Record<string, any>,
  apiMethod: ApiRequestMethodType,
): Promise<string> => {
  const nextUrlIndex = urlsRequested.push({ option, apiMethod });

  return new Promise((resolve, reject) => setTimeout(() => {
    for (let i = nextUrlIndex; i < urlsRequested.length; i += 1) {
      if (
        isEqual(urlsRequested[i].option, option)
          && urlsRequested[i].apiMethod === apiMethod
      ) {
        return reject(
          new DebounceError(
            'Multiple Requests To Same Url With The Same Data Debounced. Sent Most Recent',
          ),
        );
      }
    }

    return resolve();
  }, RequestDebounceTime));
};

export const requestApi: Request = async (method, data) => {
  try {
    await debounce(data, method);
    // @ts-ignore
    const response = await api[method]('', { params: data });

    if (response.data.error) throw response.data.error;

    return {
      data: response.data,
    };
  } catch (error) {
    if (error.response?.data) {
      return { error: error.response?.data };
    }
    throw error;
  }
};

export default requestApi;
