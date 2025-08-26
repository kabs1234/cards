import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Cards, CardType } from '../../types/types';
import { Namespace } from '../../const';
import { cardsApi } from '../../api/cardsApi';

type CardsSlice = {
  cards: Cards;
};

const initialState: CardsSlice = {
  cards: [],
};

export const cardsSlice = createSlice({
  name: Namespace.Cards,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      cardsApi.endpoints.getCards.matchFulfilled,
      (state, action: PayloadAction<Cards>) => {
        const fetchedCards = action.payload;

        state.cards = fetchedCards;
      }
    );
    builder.addMatcher(
      cardsApi.endpoints.createCard.matchFulfilled,
      (state, action: PayloadAction<CardType>) => {
        const newCard = action.payload;

        state.cards = [...state.cards, newCard];
      }
    );
  },
});
