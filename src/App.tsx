import { useEffect, useState, type ReactElement } from 'react';
import CardList from './pages/CardList';
import type { Cards } from './types/types';
import { fetchCards } from './api/cardsApi';

export default function App(): ReactElement {
  const [cards, setCards] = useState<Cards | null>(null);

  useEffect(() => {
    const getCards = async (): Promise<void> => {
      const cards = await fetchCards();

      setCards(cards);
    };

    getCards();
  }, []);

  return <CardList cards={cards} />;
}
