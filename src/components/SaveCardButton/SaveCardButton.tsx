import { Button } from '@mui/material';
import type { ReactElement } from 'react';
import type { CardFormType } from '../../types/types';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';
import { useSaveCardMutation } from '../../api/cardsApi';

export default function SaveCardButton({
  card,
  isFormValidated,
  onCardSuccesfulSave,
  setIsActionLoading,
}: {
  card: CardFormType;
  isFormValidated: boolean;
  onCardSuccesfulSave: () => void;
  setIsActionLoading: React.Dispatch<React.SetStateAction<boolean>>;
}): ReactElement {
  const [saveCard, { isLoading }] = useSaveCardMutation();

  const tryToSaveCard = async () => {
    try {
      setIsActionLoading(true);
      await saveCard(card).unwrap();
      toast.success('Card was created successfully!');
      onCardSuccesfulSave();
    } catch (err) {
      toast.error(
        'Unexpected error occured. Please try to save the card again'
      );
      throw err;
    } finally {
      setIsActionLoading(false);
    }
  };

  const onSaveCardButtonClick = (): void => {
    if (isFormValidated) {
      tryToSaveCard();
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
