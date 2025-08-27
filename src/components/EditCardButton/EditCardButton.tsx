import { Button } from '@mui/material';
import type { ReactElement } from 'react';
import { useEditCardMutation } from '../../api/cardsApi';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';
import type { EditCardFormType } from '../../types/types';

export default function EditCardButton({
  card,
  isFormValidated,
  onCardSuccesfulEdit,
}: {
  card: EditCardFormType;
  isFormValidated: boolean;
  onCardSuccesfulEdit: () => void;
}): ReactElement {
  const [editCard, { isLoading }] = useEditCardMutation();

  const tryToEditCard = async () => {
    try {
      await editCard(card).unwrap();
      toast.success('Card was edited successfully!');
      onCardSuccesfulEdit();
    } catch (err) {
      toast.error(
        'Unexpected error occured. Please try to save the card again'
      );
      throw err;
    }
  };

  const onEditCardButtonClick = (): void => {
    if (isFormValidated) {
      tryToEditCard();
    } else {
      toast.error('Fill all the fields please');
    }
  };

  return (
    <>
      {isLoading && <Loader />}

      <Button onClick={onEditCardButtonClick} disabled={isLoading}>
        {isLoading ? 'Editing card...' : 'Edit card'}
      </Button>
    </>
  );
}
