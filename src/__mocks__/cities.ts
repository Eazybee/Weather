
const mock = {
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
  favorite: false,
  notes: [],
};

const mock1 = {
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
  favorite: false,
  notes: [],
};
mock1.location.name = 'Alternate';
const mock2 = {
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
  favorite: false,
  notes: [],
};
mock2.location.name = 'Uleyo';
const mock3 = {
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
  favorite: false,
  notes: [],
};
mock3.location.name = 'ijesha';
const mock4 = {
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
  favorite: false,
  notes: [],
};
mock4.location.name = 'New York';

export default [mock, mock1, mock2, mock3, mock4];
