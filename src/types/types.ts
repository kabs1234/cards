export type CardType = {
  id: number;
  clientName: string;
  cardNumber: number;
  expiryDate: string;
  cvc: number;
  cardType: string;
  createdAt: string;
};

export type Cards = CardType[];
