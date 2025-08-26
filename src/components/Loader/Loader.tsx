import { Box, CircularProgress } from '@mui/material';
import type { ReactElement } from 'react';

const loaderStyles = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  left: '0',
  margin: 'auto',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export default function Loader(): ReactElement {
  return (
    <Box sx={loaderStyles}>
      <CircularProgress />
    </Box>
  );
}
