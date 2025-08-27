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
      cardsApi.endpoints.saveCard.matchFulfilled,
      (state, action: PayloadAction<CardType>) => {
        const newCard = action.payload;

        state.cards = [...state.cards, newCard];
      }
    );
    builder.addMatcher(
      cardsApi.endpoints.editCard.matchFulfilled,
      (state, action: PayloadAction<CardType>) => {
        const editedCard = action.payload;
        const cardToReplace = state.cards.find((card) => {
          return card.id === editedCard.id;
        });
        const cardToReplaceIndex = state.cards.findIndex((card) => {
          return card.id === (cardToReplace as CardType).id;
        });

        state.cards = [
          ...state.cards.slice(0, cardToReplaceIndex),
          editedCard,
          ...state.cards.slice(cardToReplaceIndex + 1),
        ];
      }
    );
    builder.addMatcher(
      cardsApi.endpoints.deleteCard.matchFulfilled,
      (state, action: PayloadAction<CardType>) => {
        const cards = state.cards;
        const deletedCard = action.payload;
        const deletedCardIndex = cards.findIndex((card) => {
          return card.id === deletedCard.id;
        });

        state.cards = [
          ...cards.slice(0, deletedCardIndex),
          ...cards.slice(deletedCardIndex + 1),
        ];
      }
    );
  },
});
