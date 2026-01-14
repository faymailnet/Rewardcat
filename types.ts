
export interface UserStats {
  totalGamesPlayed: number;
  totalCoinsEarned: number;
  pindinoHighScore: number;
  catDashHighScore: number;
  winRate: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface Transaction {
  id: string;
  type: 'Game' | 'Ad' | 'Withdraw' | 'Bonus';
  amount: number;
  date: string;
  status: 'Completed' | 'Pending';
}

export interface UserProfile {
  id: string;
  name: string;
  balance: number;
  level: number;
  xp: number;
  streak: number;
  avatar: string;
  stats: UserStats;
  achievements: Achievement[];
  transactions: Transaction[];
}

export interface Game {
  id: string;
  title: string;
  category: 'Arcade' | 'Puzzle' | 'Action' | 'Strategy';
  description: string;
  reward: number;
  image: string;
  isPlayable: boolean;
  externalUrl?: string;
}

export enum Page {
  DASHBOARD = 'DASHBOARD',
  GAMES = 'GAMES',
  LEADERBOARD = 'LEADERBOARD',
  WALLET = 'WALLET',
  PROFILE = 'PROFILE',
  GAME_VIEW = 'GAME_VIEW'
}

export interface DailyChallenge {
  id: string;
  task: string;
  reward: number;
  completed: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  avatar: string;
  isUser?: boolean;
}
