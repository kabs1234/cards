import { useEffect, useState, type ReactElement } from 'react';
import CardList from './pages/CardList';
import type { Cards } from './types/types';
import { fetchCards } from './api/cardsApi';
import CardForm from './components/CardForm/CardForm';
import './App.css';
import { Box } from '@mui/material';

export default function App(): ReactElement {
  const [cards, setCards] = useState<Cards | null>(null);

  useEffect(() => {
    const getCards = async (): Promise<void> => {
      const cards = await fetchCards();

      setCards(cards);
    };

    getCards();
  }, []);

  return (
    <Box sx={{ width: '280px', margin: '20px auto 0' }}>
      <CardForm />

      <CardList cards={cards} />
    </Box>
  );
}
