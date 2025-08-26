import { Card, CardContent, CardActions, Button } from '@mui/material';
import type { ReactElement } from 'react';
import type { CardType } from '../../types/types';
import dayjs from 'dayjs';

export default function CardITem({
  clientName,
  cardNumber,
  expiryDate,
  cvc,
  cardType,
  createdAt,
}: CardType): ReactElement {
  const humanizedCreatedData = dayjs(createdAt).format('DD.MM.YYYY');

  return (
    <Card>
      <CardContent>
        <p>{clientName}</p>
        <p>{cardNumber}</p>
        <p>{expiryDate}</p>
        <p>{cvc}</p>
        <p>{cardType}</p>
        <p>{humanizedCreatedData}</p>
      </CardContent>
      <CardActions>
        <Button size="small">Edit card</Button>
      </CardActions>
    </Card>
  );
}
