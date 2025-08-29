import { Namespace } from '../../const/const';
import type { RootState } from '../store';

export const getCards = (state: RootState) => {
  return state[Namespace.Cards].cards;
};

export const getIsLoading = (state: RootState) =>
  state[Namespace.Cards].isLoading;
