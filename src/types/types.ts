export interface GameHistory {
  gameName: string;
  winnerUsername: string;
  date: string;
  winnerAmount: string | number;
}

export interface TxnHistory {
  date: string;
  amount: string | number;
  reason: string;
  sign: "+" | "-";
}
