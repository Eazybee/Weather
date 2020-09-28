import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import { CitiesContext, ActionType } from '<contexts>/Cities';
import request from '<helpers>/request';
import { ApiResponse } from '<helpers>/typings';


let timer: number;
const Input = () => {
  const { state: citiesState, dispatch } = useContext(CitiesContext);
  const history = useHistory();


  const promiseOptions = (inputValue: string) => new Promise((resolve) => {
    if (timer) {
      clearTimeout(timer);
    }

    if (inputValue.trim() !== '') {
      if (citiesState.length) {
        const existingRec: any = [];
        citiesState.forEach((city, index) => {
          const { location } = city;
          if (location.name.toLowerCase().includes(inputValue.toLowerCase().trim())) {
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
      timer = setTimeout(async () => {
        try {
          const response = (await request('get', { query: inputValue })) as {
            data: ApiResponse;
            error?: any;
          };

          if (response.error) {
            throw new Error();
          }
          const {
            location: { country, name, region },
            current,
          } = response.data;

          if (name.toLowerCase().includes(inputValue.toLowerCase().trim())) {
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
                weather_icon: current.weather_icons[0].toString(),
                weather_description: current.weather_descriptions[0].toString(),
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
          return resolve([]);
        }
        return resolve([]);
      }, 1000);
    } else {
      return resolve([]);
    }
  });

  const onChange = async (e: { value: string; label: string; index: number }) => {
    const {
      value, label, index, ...rest
    } = e;

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
