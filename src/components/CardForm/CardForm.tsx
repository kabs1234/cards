import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { type ReactElement } from 'react';
import type {
  CardFormType,
  CardType,
  EditCardFormType,
} from '../../types/types';
import {
  Controller,
  useForm,
  type SubmitErrorHandler,
  type SubmitHandler,
} from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import MaskedField from '../MaskedField/MaskedField';
import PreviewCard from '../PreviewCard/PreviewCard';
import { useEditCardMutation, useSaveCardMutation } from '../../api/cardsApi';
import { getIsLoading } from '../../store/cardsSlice/card.selectors';
import SubmitButton from '../SubmitButton/SubmitButton';
import { useQueryAction } from '../../hooks/hooks';
import { useAppSelector } from '../../hooks/store';
import {
  getActionErrorMessage,
  showErrorToast,
  showSuccessToast,
} from '../../utils/utils';

type Form = z.infer<typeof formSchema>;

const formSchema = z.object({
  clientName: z
    .string()
    .min(2, {
      error: 'Name must be at least 2 characters.',
    })
    .refine(
      (formName) => {
        const nameRegExp = new RegExp('^[a-zA-Z А-Яа-я]+$');
        return nameRegExp.test(formName);
      },
      {
        error: 'Name must be without digits',
      }
    ),
  cardNumber: z.string().min(19, {
    error: 'Must be filled',
  }),
  expiryDate: z.string().min(5, {
    error: 'Must be filled',
  }),
  cvc: z.string().min(3, {
    error: 'Must be filled',
  }),
  paymentSystem: z.literal(['Visa', 'Mastercard'], {
    error: 'Card type field is required. Choose one of the options please',
  }),
});

export default function CardForm({
  cardForm,
  onModalClose,
}: {
  cardForm: EditCardFormType | CardFormType;
  onModalClose: () => void;
}): ReactElement {
  const isLoading = useAppSelector(getIsLoading);

  const [editCard] = useEditCardMutation();
  const [saveCard] = useSaveCardMutation();

  const { control, formState, handleSubmit, getValues } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: cardForm.cardNumber,
      paymentSystem: cardForm.paymentSystem,
      cvc: cardForm.cvc,
      expiryDate: cardForm.expiryDate,
      clientName: cardForm.clientName,
    },
    mode: 'onSubmit',
  });

  const isFormValid = formState.isValid;
  const form = getValues();
  const isCardEdit = cardForm.cardNumber.length !== 0;
  const submitButtonText = isCardEdit ? 'Edit card' : 'Delete Card';
  const submitButtonLoadingText = isCardEdit
    ? 'Editing card...'
    : 'Deleting Card...';

  const onInvalid: SubmitErrorHandler<Form> = (errors): void => {
    console.error('Форма НЕ прошла валидацию', errors);
  };

  const onSuccesfulAction = (message: string): void => {
    showSuccessToast(message);
    onModalClose();
  };

  const tryToEditCard = useQueryAction<CardType, EditCardFormType>({
    action: editCard,
    onSuccess: () => onSuccesfulAction('Card was edited successfully!'),
    onError: () => showErrorToast(getActionErrorMessage('edit')),
  });

  const tryToSaveCard = useQueryAction<CardType, CardFormType>({
    action: saveCard,
    onSuccess: () => onSuccesfulAction('Card was created successfully!'),
    onError: () => showErrorToast(getActionErrorMessage('save')),
  });

  const onValid: SubmitHandler<Form> = (form): void => {
    if (isCardEdit) {
      const cardEdit = { ...form, id: (cardForm as EditCardFormType).id };
      tryToEditCard(cardEdit);
      return;
    }

    tryToSaveCard(form);
  };

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <FormControl
        sx={{
          backgroundColor: 'white',
          marginBottom: '20px',
          '& .MuiTextField-root': {
            marginBottom: '20px',
          },
        }}
      >
        <Controller
          name="clientName"
          control={control}
          render={({ field }) => (
            <TextField
              label="Full name"
              value={field.value}
              onChange={field.onChange}
              variant="standard"
              error={!!formState.errors.clientName}
              helperText={formState.errors.clientName?.message}
            />
          )}
        />

        <Controller
          name="cardNumber"
          control={control}
          render={({ field }) => (
            <MaskedField
              label="Card number"
              mask="9999 9999 9999 9999"
              value={field.value}
              onChange={field.onChange}
              error={!!formState.errors.cardNumber}
              helperText={formState.errors.cardNumber?.message}
            />
          )}
        />

        <Controller
          name="expiryDate"
          control={control}
          render={({ field }) => (
            <MaskedField
              label="Expiration date"
              mask="99/99"
              value={field.value}
              onChange={field.onChange}
              error={!!formState.errors.expiryDate}
              helperText={formState.errors.expiryDate?.message}
            />
          )}
        />

        <Controller
          name="cvc"
          control={control}
          render={({ field }) => (
            <MaskedField
              label="CVC/CVV"
              mask="999"
              value={field.value}
              onChange={field.onChange}
              error={!!formState.errors.cvc}
              helperText={formState.errors.cvc?.message}
            />
          )}
        />

        <Controller
          name="paymentSystem"
          control={control}
          render={({ field }) => (
            <FormControl error={!!formState.errors.paymentSystem}>
              <InputLabel id="payment-system-label">Payment System</InputLabel>

              <Select
                labelId="payment-system-label"
                label="Payment System"
                value={field.value || ''}
                onChange={field.onChange}
              >
                <MenuItem value={'Visa'}>Visa</MenuItem>
                <MenuItem value={'Mastercard'}>Mastercard</MenuItem>
              </Select>

              <FormHelperText>{formState.errors.cvc?.message}</FormHelperText>
            </FormControl>
          )}
        />
      </FormControl>

      <PreviewCard card={form} isFormValid={isFormValid} />

      <SubmitButton
        isLoading={isLoading}
        text={submitButtonText}
        loadingText={submitButtonLoadingText}
      />
    </form>
  );
}
