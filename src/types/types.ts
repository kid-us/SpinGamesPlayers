export interface Game {
  id: number;
  date: string;
  amount: number;
  reason: number;
  sign: string;
}

export interface GameHistory {
  game: Game[];
  current_page: 1;
  total_items: 0;
  total_pages: 0;
  has_next: false;
  has_prev: false;
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
