import { Button, Modal, Box } from '@mui/material';
import { useState, type ChangeEvent, type ReactElement } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import type { CardFormType, EditCardFormType } from '../../types/types';
import PreviewCard from '../PreviewCard/PreviewCard';
import SaveCardButton from '../SaveCardButton/SaveCardButton';
import EditCardButton from '../EditCardButton/EditCardButton';
import CardForm from '../CardForm/CardForm';

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

const closeFormButtonStyles = {
  position: 'absolute',
  display: 'flex',
  minWidth: '30px',
  width: '30px',
  height: '30px',
  padding: 0,
  right: 0,
};

const EMPTY_CARD_FORM_STATE: CardFormType = {
  cardNumber: '',
  clientName: '',
  expiryDate: '',
  cvc: '',
  cardType: '',
};

export default function CardModal({
  isCardEdit: isCardEdit,
  cardEdit: cardEdit,
}: {
  isCardEdit?: boolean;
  cardEdit?: EditCardFormType;
}): ReactElement {
  const [cardForm, setCardForm] = useState<CardFormType>(
    isCardEdit && cardEdit ? cardEdit : EMPTY_CARD_FORM_STATE
  );
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const [isActionLoading, setIsActionLoading] = useState<boolean>(false);

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

  const onFormClose = () => {
    if (isActionLoading) {
      return;
    }

    setIsFormOpen(false);
  };

  const onCardSuccesfulSave = (): void => {
    onFormClose();
    setCardForm(EMPTY_CARD_FORM_STATE);
  };

  const onCardSuccesfulEdit = (): void => {
    onFormClose();
    setCardForm(cardForm);
  };

  const onFormButtonClick = (): void => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Button onClick={onFormButtonClick}>
        {isCardEdit ? 'Edit card' : 'Add card'}
      </Button>

      <Modal
        open={isFormOpen}
        onClose={onFormClose}
        sx={{
          backgroundColor: isActionLoading
            ? 'rgba(0,0,0, 0.35)'
            : 'transparent',
        }}
      >
        <Box sx={cardFormStyles}>
          <Button sx={closeFormButtonStyles} onClick={onFormClose}>
            <CloseIcon />
            <span className="visually-hidden">Close card form</span>
          </Button>

          <CardForm cardForm={cardForm} onFieldChange={onFieldChange} />

          <PreviewCard card={cardForm} isFormValidated={isFormValidated()} />

          {isCardEdit && cardEdit ? (
            <EditCardButton
              card={{ ...cardForm, id: cardEdit.id }}
              isFormValidated={isFormValidated()}
              onCardSuccesfulEdit={onCardSuccesfulEdit}
              setIsActionLoading={setIsActionLoading}
            />
          ) : (
            <SaveCardButton
              card={cardForm}
              isFormValidated={isFormValidated()}
              onCardSuccesfulSave={onCardSuccesfulSave}
              setIsActionLoading={setIsActionLoading}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
}
