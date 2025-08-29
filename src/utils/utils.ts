import { toast } from 'react-toastify';
import {
  DEFAULT_ERROR_ACTION_MESSAGE,
  DEFAULT_SUCCESSFUL_ACTION_MESSAGE,
} from '../const/messages';
import type { CardActions } from '../types/types';

export const showErrorToast = (
  message: string = DEFAULT_ERROR_ACTION_MESSAGE
): void => {
  toast.error(message);
};

export const showSuccessToast = (
  message: string = DEFAULT_SUCCESSFUL_ACTION_MESSAGE
): void => {
  toast.success(message);
};

export const getActionErrorMessage = (action: CardActions): string => {
  return `Unexpected error occured. Please try to ${action} the card again`;
};
