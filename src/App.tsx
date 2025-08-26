import { type ReactElement } from 'react';
import CardList from './pages/CardList';
import CardForm from './components/CardForm/CardForm';
import './App.css';
import { Box } from '@mui/material';
import { useGetCardsQuery } from './api/cardsApi';
import Loader from './components/Loader/Loader';

export default function App(): ReactElement {
  const { isUninitialized, isLoading, isError, data } = useGetCardsQuery();

  if (isLoading || isUninitialized) {
    return <Loader />;
  }

  if (isError) {
    return <p>Unexpected error occured! Try to reload the page please!</p>;
  }

  return (
    <Box sx={{ width: '280px', margin: '20px auto 0' }}>
      <CardForm />

      <CardList cards={data} />
    </Box>
  );
}
