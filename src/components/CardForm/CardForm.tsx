import { Button, Modal, FormControl, TextField, Box } from '@mui/material';
import { useState, type ReactElement } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const cardFormStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '280px',
  height: '300px',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
  bgcolor: 'background.paper',
  '& .MuiBackdrop-root': { backgroundColor: 'transparent' },
};

const openFormButtonStyles = {
  position: 'absolute',
  display: 'flex',
  minWidth: '30px',
  width: '30px',
  height: '30px',
  padding: 0,
  right: 0,
};

export default function CardForm(): ReactElement {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const onCloseFormButtonClick = () => setIsFormOpen(false);

  const onFormButtonClick = (): void => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Button onClick={onFormButtonClick}>
        {isFormOpen ? 'Close Card' : 'Add card'}
      </Button>

      <Modal
        sx={cardFormStyles}
        open={isFormOpen}
        onClose={onCloseFormButtonClick}
      >
        <Box sx={{ position: 'relative' }}>
          <Button sx={openFormButtonStyles} onClick={onCloseFormButtonClick}>
            <CloseIcon />
            <span className="visually-hidden">Close card form</span>
          </Button>
          <FormControl sx={{ backgroundColor: 'white', marginBottom: '20px' }}>
            <TextField label="Fullname" variant="standard" />
            <TextField
              label="Card number"
              variant="standard"
              slotProps={{ htmlInput: { maxLength: 16 } }}
            />
            <TextField label="Expiration date" variant="standard" />
            <TextField label="CVC/CVV" variant="standard" />
            <TextField label="Card type" variant="standard" />
          </FormControl>

          <Button>Preview card</Button>
          <Button>Save card</Button>
        </Box>
      </Modal>
    </Box>
  );
}
