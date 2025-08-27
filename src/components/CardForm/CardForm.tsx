import { FormControl, TextField } from '@mui/material';
import type { ChangeEvent, ReactElement } from 'react';
import type { CardFormType } from '../../types/types';

export default function CardForm({
  cardForm,
  onFieldChange,
}: {
  cardForm: CardFormType;
  onFieldChange: (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: string
  ) => void;
}): ReactElement {
  return (
    <FormControl sx={{ backgroundColor: 'white', marginBottom: '20px' }}>
      <TextField
        label="Fullname"
        value={cardForm.clientName}
        onChange={(evt) => onFieldChange(evt, 'clientName')}
        variant="standard"
        required
      />
      <TextField
        label="Card number"
        variant="standard"
        value={cardForm.cardNumber}
        onChange={(evt) => onFieldChange(evt, 'cardNumber')}
        slotProps={{ htmlInput: { maxLength: 16 } }}
        required
      />
      <TextField
        label="Expiration date"
        value={cardForm.expiryDate}
        onChange={(evt) => onFieldChange(evt, 'expiryDate')}
        variant="standard"
        required
      />
      <TextField
        label="CVC/CVV"
        value={cardForm.cvc}
        onChange={(evt) => onFieldChange(evt, 'cvc')}
        variant="standard"
        required
      />
      <TextField
        label="Card type"
        value={cardForm.cardType}
        onChange={(evt) => onFieldChange(evt, 'cardType')}
        variant="standard"
        required
      />
    </FormControl>
  );
}
