import { Button } from '@mui/material';
import type { ReactElement } from 'react';
import { useCreateCardMutation } from '../../api/cardsApi';
import type { CardForm } from '../../types/types';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';

export default function SaveCardButton({
  card,
  isFormValidated,
  onCardSuccesfulSave,
}: {
  card: CardForm;
  isFormValidated: boolean;
  onCardSuccesfulSave: () => void;
}): ReactElement {
  const [createCard, { isLoading }] = useCreateCardMutation();

  const saveCard = async () => {
    try {
      await createCard(card).unwrap();
      toast.success('Card was created successfully!');
      onCardSuccesfulSave();
    } catch (err) {
      toast.error(
        'Unexpected error occured. Please try to save the card again'
      );
      throw err;
    }
  };

  const onSaveCardButtonClick = (): void => {
    if (isFormValidated) {
      saveCard();
    } else {
      toast.error('Fill all the fields please');
    }
  };

  return (
    <>
      {isLoading && <Loader />}

      <Button onClick={onSaveCardButtonClick} disabled={isLoading}>
        {isLoading ? 'Saving card...' : 'Save card'}
      </Button>
    </>
  );
}
