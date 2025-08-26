import { Button, Modal, FormControl, TextField, Box } from '@mui/material';
import { useState, type ChangeEvent, type ReactElement } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import type { CardForm } from '../../types/types';
import PreviewCard from '../PreviewCard/PreviewCard';
import SaveCardButton from '../SaveCardButton/SaveCardButton';

const cardFormStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '280px',
  height: '300px',
  boxShadow: 24,
  p: '20px',
  bgcolor: 'background.paper',
  '& .MuiBackdrop-root': { backgroundColor: 'transparent' },
};

const openFormButtonStyles = {
  position: 'absolute',
  display: 'flex',
  minWidth: '30px',
  width: '30px',
  height: '30px',
  padding: 0,
  right: 0,
};

export default function CardForm(): ReactElement {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const initialFormState = {
    cardNumber: '',
    clientName: '',
    expiryDate: '',
    cvc: '',
    cardType: '',
  };

  const [cardForm, setCardForm] = useState<CardForm>(initialFormState);

  const onFieldChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: string
  ): void => {
    const value = evt.target.value;

    setCardForm((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const isFormValidated = (): boolean => {
    return Object.values(cardForm).every(Boolean);
  };

  const onFormClose = () => setIsFormOpen(false);

  const onCardSuccesfulSave = (): void => {
    onFormClose();
    setCardForm(initialFormState);
  };

  const onFormButtonClick = (): void => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Button onClick={onFormButtonClick}>Add card</Button>

      <Modal open={isFormOpen} onClose={onFormClose}>
        <Box sx={cardFormStyles}>
          <Button sx={openFormButtonStyles} onClick={onFormClose}>
            <CloseIcon />
            <span className="visually-hidden">Close card form</span>
          </Button>
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

          <PreviewCard card={cardForm} isFormValidated={isFormValidated()} />
          <SaveCardButton
            card={cardForm}
            isFormValidated={isFormValidated()}
            onCardSuccesfulSave={onCardSuccesfulSave}
          />
        </Box>
      </Modal>
    </Box>
  );
}
