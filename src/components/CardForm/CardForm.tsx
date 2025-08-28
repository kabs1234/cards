import {
  FormControl,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from '@mui/material';
import { type ChangeEvent, type ReactElement } from 'react';
import type { CardFormType } from '../../types/types';
import InputMask from '@mona-health/react-input-mask';
import { FULL_NAME_REGEXP } from '../../const';

function MaskField({
  value,
  mask,
  label,
  onChange,
  ...props
}: {
  value: string;
  mask: string;
  label: string;
  onChange: (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: string
  ) => void;
}) {
  return (
    <InputMask mask={mask} value={value} onChange={onChange}>
      <TextField label={label} variant="standard" required {...props} />
    </InputMask>
  );
}

export default function CardForm({
  cardForm,
  onFieldChange,
}: {
  cardForm: CardFormType;
  onFieldChange: (
    evt:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent,
    fieldName: string
  ) => void;
}): ReactElement {
  const isFullNameCorrect = (fullName: string): boolean => {
    const nameRegExp = new RegExp(FULL_NAME_REGEXP);
    return nameRegExp.test(fullName);
  };

  return (
    <FormControl sx={{ backgroundColor: 'white', marginBottom: '20px' }}>
      <TextField
        label="Fullname"
        value={cardForm.clientName}
        onChange={(evt) => onFieldChange(evt, 'clientName')}
        variant="standard"
        required
        error={!isFullNameCorrect(cardForm.clientName)}
        helperText="Incorrect entry."
      />
      <MaskField
        label="Card number"
        mask="9999 9999 9999 9999"
        value={cardForm.cardNumber}
        onChange={(evt) => onFieldChange(evt, 'cardNumber')}
      />
      <MaskField
        label="Expiration date"
        mask="99/99"
        value={cardForm.expiryDate}
        onChange={(evt) => onFieldChange(evt, 'expiryDate')}
      />
      <MaskField
        label="CVC/CVV"
        mask="999"
        value={cardForm.cvc}
        onChange={(evt) => onFieldChange(evt, 'cvc')}
      />

      <Select
        value={cardForm.cardType}
        label="Card Type"
        onChange={(evt) => onFieldChange(evt, 'cardType')}
      >
        <MenuItem value={'visa'}>Visa</MenuItem>
        <MenuItem value={'mastercard'}>Mastercard</MenuItem>
      </Select>
    </FormControl>
  );
}
