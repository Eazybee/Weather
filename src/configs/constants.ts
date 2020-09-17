
export const IsDevelopment = process.env.MODE === 'development';
export const BaseUrl = IsDevelopment
  ? `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}`
  : `https://cors-anywhere.herokuapp.com/http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}`;
export const RequestDebounceTime = 1000;
