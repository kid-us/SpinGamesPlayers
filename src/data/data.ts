import type { GameHistory, TxnHistory } from "@/types/types";

// Game History
export const mockGameHistory: GameHistory[] = [
  {
    gameName: "Lucky Spin",
    winnerUsername: "playerOne",
    date: "2025-09-01",
    winnerAmount: 1200,
  },
  {
    gameName: "Mega Dice",
    winnerUsername: "coolCat",
    date: "2025-09-02",
    winnerAmount: 850,
  },
  {
    gameName: "Treasure Hunt",
    winnerUsername: "goldDigger",
    date: "2025-09-03",
    winnerAmount: "1,500",
  },
  {
    gameName: "Bingo Blast",
    winnerUsername: "luckyStar",
    date: "2025-09-04",
    winnerAmount: 220,
  },
  {
    gameName: "Roulette Rush",
    winnerUsername: "spinKing",
    date: "2025-09-05",
    winnerAmount: 940,
  },
  {
    gameName: "Card Clash",
    winnerUsername: "aceMaster",
    date: "2025-09-06",
    winnerAmount: "3,200",
  },
  {
    gameName: "Coin Flip",
    winnerUsername: "headsUp",
    date: "2025-09-07",
    winnerAmount: 100,
  },
  {
    gameName: "Jackpot Mania",
    winnerUsername: "bigWinner",
    date: "2025-09-08",
    winnerAmount: 7200,
  },
  {
    gameName: "Puzzle Quest",
    winnerUsername: "mindBender",
    date: "2025-09-09",
    winnerAmount: 640,
  },
  {
    gameName: "Dice Duel",
    winnerUsername: "luckyDice",
    date: "2025-09-10",
    winnerAmount: "2,450",
  },
  {
    gameName: "Wheel of Fortune",
    winnerUsername: "fortuneSeeker",
    date: "2025-09-11",
    winnerAmount: 5100,
  },
  {
    gameName: "Mystery Box",
    winnerUsername: "shadowHunter",
    date: "2025-09-12",
    winnerAmount: 330,
  },
];

// Txn History
export const mockTxnHistory: TxnHistory[] = [
  {
    date: "2025-09-01",
    amount: 500,
    reason: "Deposit Bonus",
    sign: "+",
  },
  {
    date: "2025-09-02",
    amount: 120,
    reason: "Game Entry Fee",
    sign: "-",
  },
  {
    date: "2025-09-03",
    amount: "2,000",
    reason: "Jackpot Win",
    sign: "+",
  },
  {
    date: "2025-09-04",
    amount: 300,
    reason: "Referral Bonus",
    sign: "+",
  },
  {
    date: "2025-09-05",
    amount: 150,
    reason: "Spin Game Loss",
    sign: "-",
  },
  {
    date: "2025-09-06",
    amount: "750",
    reason: "Tournament Reward",
    sign: "+",
  },
  {
    date: "2025-09-07",
    amount: 200,
    reason: "Purchase Coins",
    sign: "-",
  },
  {
    date: "2025-09-08",
    amount: 1000,
    reason: "Lucky Draw",
    sign: "+",
  },
  {
    date: "2025-09-09",
    amount: 90,
    reason: "Service Fee",
    sign: "-",
  },
  {
    date: "2025-09-10",
    amount: "1,200",
    reason: "Weekly Bonus",
    sign: "+",
  },
  {
    date: "2025-09-11",
    amount: 400,
    reason: "Withdraw",
    sign: "-",
  },
  {
    date: "2025-09-12",
    amount: 2200,
    reason: "Big Win",
    sign: "+",
  },
];
