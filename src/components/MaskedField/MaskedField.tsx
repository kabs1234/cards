import InputMask from '@mona-health/react-input-mask';
import { TextField } from '@mui/material';
import type { ChangeEvent } from 'react';

export default function MaskedField({
  value,
  mask,
  label,
  onChange,
  error,
  helperText,
}: {
  value: string;
  mask: string;
  label: string;
  error: boolean;
  helperText: string | undefined;
  onChange: (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: string
  ) => void;
}) {
  return (
    <InputMask mask={mask} value={value} onChange={onChange}>
      <TextField
        label={label}
        variant="standard"
        error={error}
        helperText={helperText}
      />
    </InputMask>
  );
}
