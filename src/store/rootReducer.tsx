import { Namespace } from '../const';
import { cardsApi } from '../api/cardsApi';
import { combineReducers } from '@reduxjs/toolkit';
import { cardsSlice } from './cardsSlice/cards.slice';

export const rootReducer = combineReducers({
  [Namespace.Cards]: cardsSlice.reducer,
  [cardsApi.reducerPath]: cardsApi.reducer,
});
