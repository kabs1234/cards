export type CardPaymentSystems = 'Visa' | 'Mastercard' | undefined;

export type CardType = {
  id: number;
  clientName: string;
  cardNumber: number;
  expiryDate: string;
  cvc: number;
  paymentSystem: CardPaymentSystems;
  createdAt: string;
};

export type CardFormType = {
  cardNumber: string;
  clientName: string;
  expiryDate: string;
  cvc: string;
  paymentSystem: CardPaymentSystems;
};

export type Cards = CardType[];

export type EditCardFormType = {
  id: string;
  cardNumber: string;
  clientName: string;
  expiryDate: string;
  cvc: string;
  paymentSystem: CardPaymentSystems;
};

export type CardActions = 'edit' | 'save' | 'delete';
