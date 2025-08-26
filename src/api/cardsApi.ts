import type { CardForm, Cards, CardType } from '../types/types';
import { BASE_URL } from '../const';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getCards: build.query<Cards, void>({
      query: () => 'cards',
    }),
    createCard: build.mutation<CardType, CardForm>({
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
  }),
});

export const { useGetCardsQuery, useCreateCardMutation } = cardsApi;
