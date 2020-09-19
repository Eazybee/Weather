/* eslint-disable no-param-reassign */
import React, { createContext, useReducer, useEffect } from 'react';
import request from '<helpers>/request';
import DebounceError from '<helpers>/DebounceError';
import { City, ApiResponse } from '<helpers>/typings';
import { Cities, LocalStoragePointer } from '<configs>/constants';

export enum ActionType {
  INITIALIZE = 'INITIALIZE',
  TOOGLE_FAVORITE = 'TOOGLE_FAVORITE',
  DELETE = 'DELETE',
  ADD = 'ADD',
  ADD_NOTE = 'ADD_NOTE',
  UPDATE_NOTE = 'UPDATE_NOTE',
  DELETE_NOTE = 'DELETE_NOTE',
}

// @ts-ignore
export const CitiesContext: React.Context<{
  state: City[];
  dispatch: React.Dispatch<{
    type: ActionType;
    payload: any;
  }>;
}> = createContext({ state: [] });

const updateLocalDB = (newCities: City[]) => {
  localStorage.removeItem(LocalStoragePointer);
  const stringifiedState = JSON.stringify(newCities);
  localStorage.setItem(LocalStoragePointer, stringifiedState);
  return JSON.parse(stringifiedState);
};

const reducer: (state: City[], action: { type: ActionType; payload: any }) => City[] | [] = (
  state,
  action,
) => {
  switch (action.type) {
    case ActionType.INITIALIZE:
      return action.payload;
    case ActionType.TOOGLE_FAVORITE:
      state[action.payload.index].favorite = !state[action.payload.index].favorite;
      return updateLocalDB(state);
    case ActionType.DELETE:
      state.splice(action.payload.index, 1);
      return updateLocalDB(state);
    case ActionType.ADD:
      state.push(action.payload);
      state.sort((
        a, b,
      ) => (a.location.name.toLowerCase() > b.location.name.toLowerCase() ? 1 : -1));
      return updateLocalDB(state);
    case ActionType.ADD_NOTE:
      state[action.payload.index].notes.unshift({ note: action.payload.note });
      return updateLocalDB(state);
    case ActionType.DELETE_NOTE:
      state[action.payload.index].notes.splice(action.payload.noteIndex, 1);
      return updateLocalDB(state);
    case ActionType.UPDATE_NOTE:
      state[action.payload.index].notes[action.payload.noteIndex].note = action.payload.note;
      return updateLocalDB(state);
    default:
      return state;
  }
};

const Provider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    (async () => {
      try {
        const myCities = localStorage.getItem(LocalStoragePointer);
        let newState: City[];

        if (myCities) {
          newState = JSON.parse(myCities) as City[];
        } else {
          const response = await Promise.allSettled(
            Cities.map((city) => request('get', { query: city })),
          );
          const succesfulRes = response.filter((res) => res.status === 'fulfilled') as {
            value: { data: ApiResponse };
          }[];

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
          localStorage.setItem(LocalStoragePointer, JSON.stringify(newState));
        }

        newState.sort((
          a, b,
        ) => (a.location.name.toLowerCase() > b.location.name.toLowerCase() ? 1 : -1));
        dispatch({ type: ActionType.INITIALIZE, payload: newState });
      } catch (error) {
        if (error instanceof DebounceError) {
          console.error(error);
        }
      }
    })();
  }, []);

  return <CitiesContext.Provider value={{ state, dispatch }}>{children}</CitiesContext.Provider>;
};

export default Provider;
