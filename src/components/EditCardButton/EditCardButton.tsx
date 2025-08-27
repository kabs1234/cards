import { Button } from '@mui/material';
import type { ReactElement } from 'react';
import { useEditCardMutation } from '../../api/cardsApi';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';
import type { EditCardFormType } from '../../types/types';

export default function EditCardButton({
  isFormValidated,
  card,
  onCardSuccesfulEdit,
  setIsActionLoading,
}: {
  isFormValidated: boolean;
  card: EditCardFormType;
  onCardSuccesfulEdit: () => void;
  setIsActionLoading: React.Dispatch<React.SetStateAction<boolean>>;
}): ReactElement {
  const [editCard, { isLoading }] = useEditCardMutation();

  const tryToEditCard = async () => {
    try {
      setIsActionLoading(true);
      await editCard(card).unwrap();
      toast.success('Card was edited successfully!');
      onCardSuccesfulEdit();
    } catch (err) {
      toast.error(
        'Unexpected error occured. Please try to edit the card again'
      );
      throw err;
    } finally {
      setIsActionLoading(false);
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
      {isLoading && <Loader isActionLoader />}

      <Button onClick={onEditCardButtonClick} disabled={isLoading}>
        {isLoading ? 'Editing card...' : 'Edit card'}
      </Button>
    </>
  );
}
