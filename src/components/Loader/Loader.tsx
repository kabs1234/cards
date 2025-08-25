import { Box, CircularProgress } from '@mui/material';
import type { ReactElement } from 'react';

export default function Loader(): ReactElement {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  );
}
