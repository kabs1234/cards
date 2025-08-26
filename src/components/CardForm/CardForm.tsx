import { Button, Modal, FormControl, TextField, Box } from '@mui/material';
import { useState, type ChangeEvent, type ReactElement } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import type { CardFormData } from '../../types/types';
import PreviewCard from '../PreviewCard/PreviewCard';

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
  const [form, setForm] = useState<CardFormData>({
    cardNumber: '',
    clientName: '',
    expiryDate: '',
    cvc: '',
    cardType: '',
  });

  const onFieldChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: string
  ): void => {
    const value = evt.target.value;

    setForm((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const validateForm = (): boolean => {
    return Object.values(form).every(Boolean);
  };

  const onFormClose = () => setIsFormOpen(false);

  const onFormButtonClick = (): void => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Button onClick={onFormButtonClick}>
        {isFormOpen ? 'Close Card' : 'Add card'}
      </Button>

      <Modal open={isFormOpen} onClose={onFormClose}>
        <Box sx={cardFormStyles}>
          <Button sx={openFormButtonStyles} onClick={onFormClose}>
            <CloseIcon />
            <span className="visually-hidden">Close card form</span>
          </Button>
          <FormControl sx={{ backgroundColor: 'white', marginBottom: '20px' }}>
            <TextField
              label="Fullname"
              value={form.clientName}
              onChange={(evt) => onFieldChange(evt, 'clientName')}
              variant="standard"
              required
            />
            <TextField
              label="Card number"
              variant="standard"
              value={form.cardNumber}
              onChange={(evt) => onFieldChange(evt, 'cardNumber')}
              slotProps={{ htmlInput: { maxLength: 16 } }}
              required
            />
            <TextField
              label="Expiration date"
              value={form.expiryDate}
              onChange={(evt) => onFieldChange(evt, 'expiryDate')}
              variant="standard"
              required
            />
            <TextField
              label="CVC/CVV"
              value={form.cvc}
              onChange={(evt) => onFieldChange(evt, 'cvc')}
              variant="standard"
              required
            />
            <TextField
              label="Card type"
              value={form.cardType}
              onChange={(evt) => onFieldChange(evt, 'cardType')}
              variant="standard"
              required
            />
          </FormControl>

          <PreviewCard previewData={form} isFormValidated={validateForm()} />
          <Button>Save card</Button>
        </Box>
      </Modal>
    </Box>
  );
}
