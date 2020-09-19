import React, {
  createContext, useState, useEffect, useContext, useCallback,
} from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import request from '<helpers>/request';
import DebounceError from '<helpers>/DebounceError';
import { CitiesContext, ActionType } from './Cities';
import { HeadCity, ApiResponse, City } from '<helpers>/typings';
import { Cities, LocalStorageHeaderPointer, LocalStorageShowGeoCityPointer } from '<configs>/constants';

type State = {
  homeCity?: HeadCity;
  loadFirstCity?: boolean;
};

// @ts-ignore
export const HeaderContext: React.Context<{
  state: State;
  setHeader: React.Dispatch<React.SetStateAction<State>>;
}> = createContext({ state: {} });

const Provider = ({ children }: any) => {
  const location = useLocation();
  const history = useHistory();
  const [geoCity, setGeoCity] = useState<City>();
  const [state, setState] = useState<State>({ loadFirstCity: false });
  const showHome = location.pathname === '/';
  const { loadFirstCity } = state;
  const ref = localStorage.getItem(LocalStorageShowGeoCityPointer);

  const { state: citiesState, dispatch } = useContext(CitiesContext);
  useEffect(() => {
    if (!ref && navigator.geolocation && showHome && !loadFirstCity && geoCity) {
      console.log(ref);
      localStorage.setItem(LocalStorageShowGeoCityPointer, '1');
      dispatch({ type: ActionType.ADD, payload: geoCity });
      history.push('/info', geoCity);
    }
  }, [dispatch, geoCity, history, loadFirstCity, ref, showHome]);


  const updateHeader = useCallback(async (query: string) => {
    try {
      const response = (await request('get', { query })) as { data: ApiResponse };
      const {
        data: { location: loc, current },
      } = response;

      if (loc && current) {
        return response.data;
      }
    } catch (error) {
      if (error instanceof DebounceError) {
        return console.error(error);
      }
    }
    return false;
  }, []);

  const homeCity = citiesState.find((city) => city.favorite) || citiesState[0];
  useEffect(() => {
    (async () => {
      if (loadFirstCity && showHome) {
        if (citiesState.length) {
          setState((stat) => ({
            ...stat,
            homeCity,
          }));
        } else {
          const newState = await updateHeader(Cities.sort()[0]);
          if (newState) {
            setState((stat) => ({
              ...stat,
              homeCity: {
                location: {
                  name: newState.location.name,
                  country: newState.location.country,
                  region: newState.location.region,
                },
                current: {
                  temperature: newState.current.temperature,
                  weather_icon: newState.current.weather_icons[0],
                  humidity: newState.current.humidity,
                  weather_description: newState.current.weather_descriptions[0],
                },
              },
            }));
          }
        }
      }
    })();
  }, [citiesState.length, homeCity, loadFirstCity, showHome, updateHeader]);

  useEffect(() => {
    (async () => {
      if (navigator.geolocation) {
        if (showHome && !loadFirstCity) {
          const position: Position | undefined = await new Promise((res) => {
            navigator.geolocation.getCurrentPosition(
              (pos) => res(pos),
              () => res(),
            );
          });

          if (position) {
            const query = `${position.coords.latitude},${position.coords.longitude}`;
            const newState = await updateHeader(query);
            if (newState) {
              localStorage.setItem(LocalStorageHeaderPointer, JSON.stringify(newState));
              if (newState) {
                setState((stat) => ({
                  ...stat,
                  homeCity: {
                    location: {
                      name: newState.location.name,
                      country: newState.location.country,
                      region: newState.location.region,
                    },
                    current: {
                      temperature: newState.current.temperature,
                      weather_icon: newState.current.weather_icons[0],
                      humidity: newState.current.humidity,
                      weather_description: newState.current.weather_descriptions[0],
                    },
                  },
                }));
              }

              if (!ref) {
                const { current, ...rest } = newState;
                setGeoCity({
                  ...rest,
                  current: {
                    temperature: current.temperature,
                    weather_icon: current.weather_icons[0],
                    weather_description: current.weather_descriptions[0],
                    wind_speed: current.wind_speed,
                    wind_degree: current.wind_degree,
                    wind_dir: current.wind_dir,
                    pressure: current.pressure,
                    humidity: current.humidity,
                    visibility: current.visibility,
                  },
                  favorite: true,
                  notes: [],
                });
              }
              return true;
            }

            const storageState = localStorage.getItem(LocalStorageHeaderPointer);
            if (storageState) {
              console.log(newState, 'bee');
              return setState(JSON.parse(storageState));
            }
          }
        }

        if (showHome) {
          return setState((stat) => ({ ...stat, loadFirstCity: true }));
        }
      }
    })();
  }, [loadFirstCity, ref, showHome, updateHeader]);

  return (
    <HeaderContext.Provider value={{ state, setHeader: setState }}>
      {children}
    </HeaderContext.Provider>
  );
};

export default Provider;
