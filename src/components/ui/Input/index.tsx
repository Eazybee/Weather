import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import { CitiesContext, ActionType } from '<contexts>/Cities';
import request from '<helpers>/request';
import { City } from '<helpers>/typings';

let timer: number;
const Input = () => {
  const { state: citiesState, dispatch } = useContext(CitiesContext);
  const history = useHistory();

  const promiseOptions = (inputValue: string) => new Promise((resolve) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(async () => {
      if (citiesState.length) {
        const existingRec: any = [];
        citiesState.forEach((city, index) => {
          const { location } = city;
          if (location.name.toLowerCase().includes(inputValue.toLowerCase())) {
            existingRec.push({
              label: location.name,
              value: `${location.country}${location.name}${location.region}`,
              index,
            });
          }
        });
        if (existingRec.length) {
          return resolve(existingRec);
        }
      }
      if (inputValue.trim() !== '') {
        try {
          const response = (await request('get', { query: inputValue })) as {
            data: City;
            error?: any;
          };

          if (response.error) {
            throw new Error();
          }
          const {
            location: { country, name, region },
            current,
          } = response.data;

          if (name.toLowerCase().includes(inputValue.toLowerCase())) {
            const opt = {
              value: `${country}${name}${region}`,
              label: name,
              location: {
                name,
                country,
                region,
              },
              current: {
                temperature: current.temperature,
                weather_icons: current.weather_icons,
                weather_descriptions: current.weather_descriptions,
                wind_speed: current.wind_speed,
                wind_degree: current.wind_degree,
                wind_dir: current.wind_dir,
                pressure: current.pressure,
                humidity: current.humidity,
                visibility: current.visibility,
              },
              favorite: false,
              notes: [],
            };
            return resolve([opt]);
          }
        } catch (error) {
          resolve([]);
        }
      }

      return resolve([]);
    }, 2000);
  });

  const onChange = async (e: { value: string; label: string; index: number }) => {
    const {
      value, label, index, ...rest
    } = e;
    console.log(index, rest);
    if (index === null || Number.isNaN(Number(index))) {
      dispatch({ type: ActionType.ADD, payload: rest });
    }
    history.push('/info', e);
  };
  return (
    <AsyncSelect
      cacheOptions
      loadOptions={promiseOptions}
      // @ts-ignore
      onChange={onChange}
      placeholder="Tokyo"
    />
  );
};

export default Input;
