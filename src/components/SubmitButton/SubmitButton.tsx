import { Button } from '@mui/material';
import type { ReactElement } from 'react';

export default function SubmitButton({
  text,
  loadingText,
  isLoading,
}: {
  text: string;
  loadingText: string;
  isLoading: boolean;
}): ReactElement {
  return (
    <Button disabled={isLoading} type="submit">
      {isLoading ? loadingText : text}
    </Button>
  );
}
