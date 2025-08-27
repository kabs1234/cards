import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useState, type ReactElement } from 'react';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';
import { useDeleteCardMutation } from '../../api/cardsApi';

export default function DeleteCardButton({
  cardId,
}: {
  cardId: number;
}): ReactElement {
  const [deleteCard, { isLoading }] = useDeleteCardMutation();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const onOpenDialogButtonClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const onDeleteDialogClose = () => {
    if (isLoading) {
      return;
    }

    setIsDeleteDialogOpen(false);
  };

  const onDeleteCardButtonClick = async () => {
    try {
      await deleteCard(cardId).unwrap();
      toast.success('Card was deleted successfully!');
      onDeleteDialogClose();
    } catch (err) {
      toast.error(
        'Unexpected error occured. Please try to delete the card again'
      );
      throw err;
    }
  };

  return (
    <>
      <Button onClick={onOpenDialogButtonClick}>Delete card</Button>

      <Dialog
        open={isDeleteDialogOpen}
        onClose={onDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        sx={{
          backgroundColor: isLoading ? 'rgba(0,0,0, 0.15)' : 'transparent',
        }}
      >
        <DialogTitle id="alert-dialog-title">Confirm card removal?</DialogTitle>

        <DialogActions>
          <Button onClick={onDeleteDialogClose}>No</Button>
          <Button onClick={onDeleteCardButtonClick} disabled={isLoading}>
            {isLoading ? 'Deleting card...' : 'Yes'}
          </Button>

          {isLoading && <Loader />}
        </DialogActions>
      </Dialog>
    </>
  );
}
