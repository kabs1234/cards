import { Card, CardContent, CardActions } from '@mui/material';
import type { ReactElement } from 'react';
import type { CardType } from '../../types/types';
import dayjs from 'dayjs';
import CardModal from '../CardModal/CardModal';
import DeleteCardButton from '../DeleteCardButton/DeleteCardButton';

export default function CardITem({
  id,
  clientName,
  cardNumber,
  expiryDate,
  cvc,
  cardType,
  createdAt,
}: CardType): ReactElement {
  const humanizedCreatedData = dayjs(createdAt).format('DD.MM.YYYY');
  const cardEditForm = {
    id: String(id),
    cardNumber: String(cardNumber),
    clientName,
    expiryDate,
    cvc: String(cvc),
    cardType,
  };

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
        <CardModal isCardEdit cardEdit={cardEditForm} />
        <DeleteCardButton cardId={id} />
      </CardActions>
    </Card>
  );
}
