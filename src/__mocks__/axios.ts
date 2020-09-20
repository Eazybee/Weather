import { getApiResponse } from '<mocks>/index';


const create = () => ({
  get: () => Promise.resolve({
    data: {...getApiResponse().data},
  }),
});

export default {
  create,
};
