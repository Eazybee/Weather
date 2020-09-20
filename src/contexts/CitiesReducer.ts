/* eslint-disable no-param-reassign */
import { City } from '<helpers>/typings';
import { LocalStoragePointer } from '<configs>/constants';


const updateLocalDB = (newCities: City[]) => {
  localStorage.removeItem(LocalStoragePointer);
  const stringifiedState = JSON.stringify(newCities);
  localStorage.setItem(LocalStoragePointer, stringifiedState);
  return JSON.parse(stringifiedState);
};

const isANumber = (index: number) => index !== undefined && !Number.isNaN(Number(index));

export enum ActionType {
  INITIALIZE = 'INITIALIZE',
  TOOGLE_FAVORITE = 'TOOGLE_FAVORITE',
  DELETE = 'DELETE',
  ADD = 'ADD',
  ADD_NOTE = 'ADD_NOTE',
  UPDATE_NOTE = 'UPDATE_NOTE',
  DELETE_NOTE = 'DELETE_NOTE',
}

type PayLoad = {
  index?: number;
  note?: string;
  noteIndex?: number;
} & City[] & City;

const reducer: (state: City[], action: { type: ActionType; payload: any }) => City[] | [] = (
  state,
  action,
) => {
  const { type, payload } = action;
  switch (type) {
    case ActionType.INITIALIZE:
      return payload;
    case ActionType.TOOGLE_FAVORITE:
      if (isANumber(payload.index)) {
        state[payload.index].favorite = !state[payload.index].favorite;
      }
      return updateLocalDB(state);
    case ActionType.DELETE:
      if (isANumber(payload.index)) {
        state.splice(payload.index, 1);
      }
      return updateLocalDB(state);
    case ActionType.ADD:
      state.push(payload);
      state.sort((
        a, b,
      ) => (a.location.name.toLowerCase() > b.location.name.toLowerCase() ? 1 : -1));
      return updateLocalDB(state);
    case ActionType.ADD_NOTE:
      if (isANumber(payload.index) && payload.note) {
        state[payload.index].notes.unshift({ note: payload.note });
      }
      return updateLocalDB(state);
    case ActionType.DELETE_NOTE:
      if (isANumber(payload.index) && isANumber(payload.noteIndex)) {
        state[payload.index].notes.splice(payload.noteIndex, 1);
      }
      return updateLocalDB(state);
    case ActionType.UPDATE_NOTE:
      if (isANumber(payload.index) && isANumber(payload.noteIndex) && payload.note) {
        state[payload.index].notes[payload.noteIndex].note = payload.note;
      }
      return updateLocalDB(state);
    default:
      return state;
  }
};

export default reducer;
