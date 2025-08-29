import { Button, Modal, Box } from '@mui/material';
import { useState, type ReactElement } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import type { CardFormType, EditCardFormType } from '../../types/types';
import CardForm from '../CardForm/CardForm';
import { getIsLoading } from '../../store/cardsSlice/card.selectors';
import Loader from '../Loader/Loader';
import { useAppSelector } from '../../hooks/store';

const cardFormStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '280px',
  minHeight: '340px',
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
  paymentSystem: undefined,
};

export default function CardModal({
  cardEdit: cardEdit,
}: {
  cardEdit?: EditCardFormType;
}): ReactElement {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const isLoading = useAppSelector(getIsLoading);

  const onModalClose = (): void => {
    if (isLoading) {
      return;
    }

    setIsModalOpen(false);
  };

  const onFormButtonClick = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Button onClick={onFormButtonClick}>
        {cardEdit ? 'Edit card' : 'Add card'}
      </Button>

      <Modal open={isModalOpen} onClose={onModalClose}>
        <Box sx={cardFormStyles}>
          <Button sx={closeFormButtonStyles} onClick={onModalClose}>
            <CloseIcon />
            <span className="visually-hidden">Close card form</span>
          </Button>

          <CardForm
            cardForm={cardEdit ? cardEdit : EMPTY_CARD_FORM_STATE}
            onModalClose={onModalClose}
          />

          {isLoading && <Loader isActionLoader />}
        </Box>
      </Modal>
    </Box>
  );
}
