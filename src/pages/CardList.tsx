import type { ReactElement } from 'react';
import type { Cards } from '../types/types';
import CardITem from '../components/CardItem/CardItem';
import { List, ListItem } from '@mui/material';
import Loader from '../components/Loader/Loader';

type CardListProps = {
  cards: Cards | null;
};

export default function CardList({ cards }: CardListProps): ReactElement {
  if (cards === null) {
    return <Loader />;
  }

  if (cards.length === 0) {
    return <p>Cards list is empty, try to add some cards please!</p>;
  }

  return (
    <List sx={{ bgcolor: 'background.paper' }}>
      {cards.map((card) => {
        return (
          <ListItem
            key={card.id}
            sx={{
              display: 'list-item',
              '&:not(:last-child)': {
                marginBottom: '20px',
              },
            }}
          >
            <CardITem key={card.id} {...card} />
          </ListItem>
        );
      })}
    </List>
  );
}
