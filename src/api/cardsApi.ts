import type {
  CardFormType,
  Cards,
  CardType,
  EditCardFormType,
} from '../types/types';
import { BASE_URL } from '../const';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getCards: build.query<Cards, void>({
      query: () => 'cards',
    }),
    saveCard: build.mutation<CardType, CardFormType>({
      query: (card) => {
        return {
          url: 'cards',
          method: 'POST',
          body: {
            ...card,
          },
        };
      },
    }),
    editCard: build.mutation<CardType, EditCardFormType>({
      query: (card) => {
        return {
          url: `cards/${card.id}`,
          method: 'PUT',
          body: {
            ...card,
          },
        };
      },
    }),
  }),
});

export const { useGetCardsQuery, useSaveCardMutation, useEditCardMutation } =
  cardsApi;
