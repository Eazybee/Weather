import getApiResponse from '<mocks>/index';


const create = () => ({
  get: () => {
    return Promise.resolve({
    data: getApiResponse(),
  });
},
});

export default {
  create,
};

