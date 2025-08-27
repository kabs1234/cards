export type CardType = {
  id: number;
  clientName: string;
  cardNumber: number;
  expiryDate: string;
  cvc: number;
  cardType: string;
  createdAt: string;
};

export type CardFormType = {
  cardNumber: string;
  clientName: string;
  expiryDate: string;
  cvc: string;
  cardType: string;
};

export type Cards = CardType[];

export type EditCardFormType = {
  id: string;
  cardNumber: string;
  clientName: string;
  expiryDate: string;
  cvc: string;
  cardType: string;
};
