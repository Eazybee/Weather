/* eslint-disable no-param-reassign */
import React, { createContext, useReducer, useEffect } from 'react';
import { requestApi as request } from '<helpers>/request';
import DebounceError from '<helpers>/DebounceError';
import { City, ApiResponse } from '<helpers>/typings';
import { Cities, LocalStoragePointer } from '<configs>/constants';
import reducer, { ActionType } from './CitiesReducer';
import useNetwork from '<hooks>/useNetwork';


// @ts-ignore
export const CitiesContext: React.Context<{
  state: City[];
  dispatch: React.Dispatch<{
    type: ActionType;
    payload: any;
  }>;
}> = createContext({ state: [] });


const Provider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, []);
  const isOnline = useNetwork();
  const update = (newState: City[]) => {
    newState.sort((
      a, b,
    ) => (a.location.name.toLowerCase() > b.location.name.toLowerCase() ? 1 : -1));

    localStorage.setItem(LocalStoragePointer, JSON.stringify(newState));
    // @ts-ignore
    dispatch({ type: ActionType.INITIALIZE, payload: newState });
  };

  useEffect(() => {
    (async () => {
      try {
        const myCities = localStorage.getItem(LocalStoragePointer);
        let newState: City[] = [];

        if (myCities) {
          newState = JSON.parse(myCities) as City[];
        }

        if (isOnline) {
          if (myCities) { update(newState); }

          const searchCity = myCities && newState.length > 0
            ? newState.map((city) => request('get', { query: city.location.name }))
            : Cities.map((city) => request('get', { query: city }));


          const response = await Promise.allSettled(searchCity);
          const succesfulRes = response.filter((res) => res.status === 'fulfilled') as {
            value: { data: ApiResponse };
          }[];

          if (succesfulRes.length) {
            // if there are cached city, update them with new city info from api
            if (myCities && newState.length > 0) {
              const updatedState = [];
              for (let i = 0; i < newState.length; i += 1) {
                const currentCity = newState[i];
                let data;
                if (currentCity.location.name === succesfulRes[i].value.data.location.name) {
                  data = succesfulRes[i].value.data;
                } else {
                  const found = succesfulRes
                    .find(({ value }) => value.data.location.name === currentCity.location.name);

                  if (found) {
                    data = found.value.data;
                  } else {
                    data = currentCity;
                  }
                }

                updatedState.push({
                  location: {
                    name: data.location?.name,
                    country: data.location?.country,
                    region: data.location?.region,
                  },
                  current: {
                    temperature: data.current?.temperature,
                    // @ts-ignore
                    weather_icon: data.current?.weather_icon
                    // @ts-ignore
                       || data.current?.weather_icons[0].toString(),
                    // @ts-ignore
                    weather_description: data.current?.weather_description
                    // @ts-ignore
                       || data.current?.weather_descriptions[0].toString(),
                    wind_speed: data.current?.wind_speed,
                    wind_degree: data.current?.wind_degree,
                    wind_dir: data.current?.wind_dir,
                    pressure: data.current?.pressure,
                    humidity: data.current?.humidity,
                    visibility: data.current?.visibility,
                  },
                  favorite: currentCity.favorite,
                  notes: currentCity.notes,
                });
              }
              newState = updatedState;
            } else {
              newState = succesfulRes.map(({ value: { data } }) => ({
                location: {
                  name: data.location?.name,
                  country: data.location?.country,
                  region: data.location?.region,
                },
                current: {
                  temperature: data.current?.temperature,
                  weather_icon: data.current?.weather_icons[0].toString(),
                  weather_description: data.current?.weather_descriptions[0].toString(),
                  wind_speed: data.current?.wind_speed,
                  wind_degree: data.current?.wind_degree,
                  wind_dir: data.current?.wind_dir,
                  pressure: data.current?.pressure,
                  humidity: data.current?.humidity,
                  visibility: data.current?.visibility,
                },
                favorite: false,
                notes: [],
              }));
            }
          } else { return; }
        }

        update(newState);
      } catch (error) {
        if (error instanceof DebounceError) {
          console.error(error);
        }
      }
    })();
  }, [isOnline]);

  return <CitiesContext.Provider value={{ state, dispatch }}>{children}</CitiesContext.Provider>;
};

export default Provider;

export { ActionType } from './CitiesReducer';
