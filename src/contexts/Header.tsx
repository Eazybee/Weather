import React, {
  createContext, useState, useEffect, useContext,
} from 'react';
import { useLocation } from 'react-router-dom';
import request from '<helpers>/request';
import DebounceError from '<helpers>/DebounceError';
import { CitiesContext } from './Cities';
import { City, HeadCity } from '<helpers>/typings';
import { Cities } from '<configs>/constants';

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
  const [state, setState] = useState<State>({ loadFirstCity: false });
  const showHome = location.pathname === '/';
  const { loadFirstCity } = state;

  const { state: citiesState } = useContext(CitiesContext);
  const homeCity = citiesState.find((city) => city.favorite) || citiesState[0];

  const updateHeader = async (query: string) => {
    try {
      const response = (await request('get', { query })) as { data: City };
      const {
        data: { location: loc, current },
      } = response;

      if (loc && current) {
        setState((stat) => ({
          ...stat,
          homeCity: {
            location: {
              name: loc?.name,
              country: loc?.country,
              region: loc?.region,
            },
            current: {
              temperature: current?.temperature,
              weather_icons: current?.weather_icons,
              humidity: current.humidity,
            },
          },
        }));
        return true;
      }
    } catch (error) {
      if (error instanceof DebounceError) {
        return console.error(error);
      }
    }
    return false;
  };

  useEffect(() => {
    if (loadFirstCity && showHome) {
      if (citiesState.length) {
        setState((stat) => ({
          ...stat,
          homeCity,
        }));
      } else {
        updateHeader(Cities.sort()[0]);
      }
    }
  }, [citiesState.length, homeCity, loadFirstCity, showHome]);

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
            if (updateHeader(query)) {
              return true;
            }
          }
        }

        if (showHome) {
          return setState((stat) => ({ ...stat, loadFirstCity: true }));
        }
      }
    })();
  }, [loadFirstCity, showHome]);

  return (
    <HeaderContext.Provider value={{ state, setHeader: setState }}>
      {children}
    </HeaderContext.Provider>
  );
};

export default Provider;
