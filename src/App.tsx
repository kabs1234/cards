import { type ReactElement } from 'react';
import CardList from './pages/CardList';
import CardModal from './components/CardModal/CardModal';
import './App.css';
import { Box } from '@mui/material';
import { useGetCardsQuery } from './api/cardsApi';
import Loader from './components/Loader/Loader';
import { getCards } from './store/cardsSlice/card.selectors';
import { useAppSelector } from './hooks/store';

export default function App(): ReactElement {
  const { isUninitialized, isLoading, isError } = useGetCardsQuery();
  const cards = useAppSelector(getCards);

  if (isLoading || isUninitialized) {
    return <Loader />;
  }

  if (isError) {
    return <p>Unexpected error occured! Try to reload the page please!</p>;
  }

  return (
    <Box sx={{ width: '280px', margin: '20px auto 0' }}>
      <CardModal />

      <CardList cards={cards} />
    </Box>
  );
}
