const getApiResponse = () => ({
  data: {
    location: {
      name: 'New York',
      country: 'United States of America',
      region: 'New York',
    },
    current: {
      observation_time: '12:14 PM',
      temperature: 13,
      weather_code: 113,
      weather_icons: [
        'https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png',
      ],
      weather_descriptions: ['Sunny'],
      wind_speed: 0,
      wind_degree: 349,
      wind_dir: 'N',
      pressure: 1010,
      precip: 0,
      humidity: 90,
      cloudcover: 0,
      feelslike: 13,
      uv_index: 4,
      visibility: 16,
    },
  },
});

export default getApiResponse;
export { default as mocks } from './cities';
