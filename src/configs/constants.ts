export const IsDevelopment = process.env.MODE === 'development';
export const BaseUrl = IsDevelopment
  ? `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}`
  : `https://cors-anywhere.herokuapp.com/http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}`;
export const RequestDebounceTime = 1000;

// https://en.wikipedia.org/wiki/List_of_largest_cities
export const Cities = [
  'Chongqing',
  'Shanghai',
  'Beijing',
  'Delhi',
  'Chengdu',
  'Tianjin',
  'Istanbul',
  'Karachi',
  'Guangzhou',
  'Dhaka',
  'Tokyo',
  'Moscow',
  'Shenzhen',
  'Mumbai',
];

export const LocalStoragePointer = 'my_cities';
export const LocalStorageHeaderBGPointer = 'my_cities_bg_header';
export const LocalStorageHeaderPointer = 'my_cities_header';
export const LocalStorageShowGeoCityPointer = 'show_geo_city';
export const isOnline = navigator.onLine;
