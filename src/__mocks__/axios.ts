import getApiResponse from '<mocks>/index';

const create = () => ({
  get: () => Promise.resolve({
    data: getApiResponse(),
  }),
});

export default {
  create,
};
