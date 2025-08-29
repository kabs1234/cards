import { Button, Card, CardActions, CardContent, Modal } from '@mui/material';
import { useState, type ReactElement } from 'react';
import type { CardFormType } from '../../types/types';
import { showErrorToast } from '../../utils/utils';

export default function PreviewCard({
  card,
  isFormValid,
}: {
  card: CardFormType;
  isFormValid: boolean;
}): ReactElement {
  const [isPreviewCardOpen, setIsPreviewCardOpen] = useState<boolean>(false);

  const onPreviewCardOpenButtonClick = (): void => {
    if (isFormValid) {
      setIsPreviewCardOpen(true);
      return;
    }

    showErrorToast('Fill all the fields please');
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
            <p>{card.paymentSystem}</p>
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
