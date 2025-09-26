export interface GameHistory {
  gameName: string;
  winnerUsername: string;
  date: string;
  winnerAmount: string | number;
}

export interface History {
  id: number;
  date: string;
  amount: number;
  reason: number;
  sign: string;
}

export interface TransactionHistory {
  transactions: History[];
  current_page: number;
  total_items: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}
