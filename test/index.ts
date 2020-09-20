export const city = {
  location: {
    name: 'Delhi',
    country: 'India',
    region: 'Delhi',
  },
  current: {
    temperature: 28,
    weather_icon: 'https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0006_mist.png',
    weather_description: 'Mist',
    wind_speed: 6,
    wind_degree: 230,
    wind_dir: 'SW',
    pressure: 1002,
    humidity: 79,
    visibility: 3,
  },
  favorite: false,
  notes: [],
};


export const apiResponse = {
  location: {
    name: 'Delhi',
    country: 'India',
    region: 'Delhi',
  },
  current: {
    temperature: 28,
    weather_icons: [
      'https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0006_mist.png',
    ],
    weather_descriptions: ['Mist'],
    wind_speed: 6,
    wind_degree: 230,
    wind_dir: 'SW',
    pressure: 1002,
    humidity: 79,
    visibility: 3,
  },
};

const mock1 = JSON.parse(JSON.stringify(city));

mock1.location.name = 'Alternate';
const mock2 = JSON.parse(JSON.stringify(city));
mock2.location.name = 'Uleyo';
const mock3 = JSON.parse(JSON.stringify(city));
mock3.location.name = 'ijesha';
const mock4 = JSON.parse(JSON.stringify(city));
mock4.location.name = 'New York';

export const cities = [city, mock1, mock2, mock3, mock4];

export const getApiResponse = () => ({
  data: JSON.parse(JSON.stringify(apiResponse)),
});
