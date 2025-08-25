import axios from 'axios';
import type { Cards } from '../types/types';
import { BASE_URL } from '../const';

export const fetchCards = async (): Promise<Cards> => {
  try {
    const request = await axios.get<Cards>(`${BASE_URL}/cards`);

    return request.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
