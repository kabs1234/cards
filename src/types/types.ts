export type CardType = {
  id: number;
  clientName: string;
  cardNumber: number;
  expiryDate: string;
  cvc: number;
  cardType: string;
  createdAt: string;
};

export type CardForm = {
  cardNumber: string;
  clientName: string;
  expiryDate: string;
  cvc: string;
  cardType: string;
};

export type Cards = CardType[];
