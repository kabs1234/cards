import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useState, type ReactElement } from 'react';
import Loader from '../Loader/Loader';
import { useDeleteCardMutation } from '../../api/cardsApi';
import { getIsLoading } from '../../store/cardsSlice/card.selectors';
import { useQueryAction } from '../../hooks/hooks';
import { useAppSelector } from '../../hooks/store';
import type { CardType } from '../../types/types';
import {
  getActionErrorMessage,
  showErrorToast,
  showSuccessToast,
} from '../../utils/utils';

export default function DeleteCardButton({
  cardId,
}: {
  cardId: number;
}): ReactElement {
  const [deleteCard] = useDeleteCardMutation();
  const isLoading = useAppSelector(getIsLoading);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const onOpenDialogButtonClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const onDialogClose = () => {
    if (isLoading) {
      return;
    }

    setIsDeleteDialogOpen(false);
  };

  const onCardSuccesfulDelete = () => {
    showSuccessToast('Card was deleted successfully!');
    onDialogClose();
  };

  const tryToDeleteCard = useQueryAction<CardType, number>({
    action: deleteCard,
    onSuccess: () => onCardSuccesfulDelete(),
    onError: () => showErrorToast(getActionErrorMessage('delete')),
  });

  const onDeleteCardButtonClick = () => {
    tryToDeleteCard(cardId);
  };

  return (
    <>
      <Button onClick={onOpenDialogButtonClick}>Delete card</Button>

      <Dialog
        open={isDeleteDialogOpen}
        onClose={onDialogClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">Confirm card removal?</DialogTitle>

        <DialogActions
          sx={{
            '& > :not(style) ~ :not(style)': {
              marginLeft: 0,
            },
          }}
        >
          <Button onClick={onDialogClose}>No</Button>
          <Button onClick={onDeleteCardButtonClick} disabled={isLoading}>
            {isLoading ? 'Deleting card...' : 'Yes'}
          </Button>

          {isLoading && <Loader isActionLoader />}
        </DialogActions>
      </Dialog>
    </>
  );
}
