import { Namespace } from '../../const';
import type { RootState } from '../store';

export const getCards = (state: RootState) => {
  return state[Namespace.Cards].cards;
};
