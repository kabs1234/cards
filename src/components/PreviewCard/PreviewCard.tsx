import { Button, Card, CardActions, CardContent, Modal } from '@mui/material';
import { useState, type ReactElement } from 'react';
import type { CardForm } from '../../types/types';
import { toast } from 'react-toastify';

export default function PreviewCard({
  card,
  isFormValidated,
}: {
  card: CardForm;
  isFormValidated: boolean;
}): ReactElement {
  const [isPreviewCardOpen, setIsPreviewCardOpen] = useState<boolean>(false);
  const onPreviewCardOpenButtonClick = (): void => {
    if (isFormValidated) {
      setIsPreviewCardOpen(true);
      return;
    }

    toast.error('Fill all the fields please');
  };

  const OnPreviewCardClose = (): void => {
    setIsPreviewCardOpen(false);
  };

  return (
    <>
      <Button onClick={onPreviewCardOpenButtonClick}>Preview card</Button>

      <Modal open={isPreviewCardOpen} onClose={OnPreviewCardClose}>
        <Card
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '280px',
            height: '260px',
          }}
        >
          <CardContent sx={{ padding: '10px 20px' }}>
            <p>{card.clientName}</p>
            <p>{card.cardNumber}</p>
            <p>{card.expiryDate}</p>
            <p>{card.cvc}</p>
            <p>{card.cardType}</p>
          </CardContent>
          <CardActions sx={{ padding: 0 }}>
            <Button sx={{ marginLeft: '20px' }} onClick={OnPreviewCardClose}>
              Close card preview
            </Button>
          </CardActions>
        </Card>
      </Modal>
    </>
  );
}
