
import { Game, LeaderboardEntry } from './types';

export const GAMES: Game[] = [
  {
    id: 'planes-dodge-go',
    title: 'Planes Dodge & Go',
    category: 'Arcade',
    description: 'Take to the skies! Dodge obstacles and navigate through challenging flight paths in this aerial adventure.',
    reward: 115,
    image: '✈️',
    isPlayable: true,
    externalUrl: 'https://playgama.com/export/game/planes-dodge--go?clid=p_1d39008a-4873-4032-ae3c-ed3a2ac8d214'
  },
  {
    id: 'millionaire-life',
    title: 'Millionaire Life',
    category: 'Strategy',
    description: 'Experience the high life! Build your business empire and become a MeowCoin tycoon.',
    reward: 120,
    image: '💰',
    isPlayable: true,
    externalUrl: 'https://playgama.com/export/game/millionaire-life?clid=p_1d39008a-4873-4032-ae3c-ed3a2ac8d214'
  },
  {
    id: 'hazmob-fps',
    title: 'Hazmob FPS',
    category: 'Action',
    description: 'Fast-paced online tactical shooter. Command your squad to victory in this elite FPS.',
    reward: 140,
    image: '🔫',
    isPlayable: true,
    externalUrl: 'https://playgama.com/export/game/hazmob-fps-online-shooter?clid=p_1d39008a-4873-4032-ae3c-ed3a2ac8d214'
  },
  {
    id: 'beam-drive',
    title: 'Beam Drive',
    category: 'Action',
    description: 'The ultimate car crash simulator. Experience realistic physics and high-speed impacts.',
    reward: 125,
    image: '💥',
    isPlayable: true,
    externalUrl: 'https://playgama.com/export/game/beam-drive-car-crash-test-simulator?clid=p_1d39008a-4873-4032-ae3c-ed3a2ac8d214'
  },
  {
    id: 'pocket-universe',
    title: 'Pocket Universe',
    category: 'Puzzle',
    description: 'Create and manage your own tiny universe from scratch in this expansive simulator.',
    reward: 130,
    image: '🌌',
    isPlayable: true,
    externalUrl: 'https://playgama.com/export/game/pocket-universe?clid=p_1d39008a-4873-4032-ae3c-ed3a2ac8d214'
  },
  {
    id: 'chicken-merge',
    title: 'Chicken Merge',
    category: 'Puzzle',
    description: 'Merge adorable chickens to upgrade your farm and defend against pesky intruders.',
    reward: 95,
    image: '🐥',
    isPlayable: true,
    externalUrl: 'https://playgama.com/export/game/chicken-merge?clid=p_1d39008a-4873-4032-ae3c-ed3a2ac8d214'
  },
  {
    id: 'mad-day-special',
    title: 'Mad Day Special',
    category: 'Action',
    description: 'Battle aliens and rescue your pet octopus in this high-octane racing shooter.',
    reward: 115,
    image: '🏎️',
    isPlayable: true,
    externalUrl: 'https://playgama.com/export/game/mad-day-special?clid=p_1d39008a-4873-4032-ae3c-ed3a2ac8d214'
  },
  {
    id: 'wild-love',
    title: 'Wild Love',
    category: 'Arcade',
    description: 'A wild romantic adventure where every choice shapes your destiny.',
    reward: 105,
    image: '❤️',
    isPlayable: true,
    externalUrl: 'https://playgama.com/export/game/wild-love?clid=p_1d39008a-4873-4032-ae3c-ed3a2ac8d214'
  },
  {
    id: 'age-of-tanks',
    title: 'Age of Tanks',
    category: 'Strategy',
    description: 'Lead your tank battalion to victory in this intense tower defense warfare.',
    reward: 110,
    image: '🚜',
    isPlayable: true,
    externalUrl: 'https://playgama.com/export/game/age-of-tanks-warriors-td-war?clid=p_1d39008a-4873-4032-ae3c-ed3a2ac8d214'
  },
  {
    id: 'art-of-defense',
    title: 'Art of Defense',
    category: 'Strategy',
    description: 'Command your forces and defend your territory in this epic tower defense.',
    reward: 100,
    image: '🛡️',
    isPlayable: true,
    externalUrl: 'https://playgama.com/export/game/aod--art-of-defense?clid=p_1d39008a-4873-4032-ae3c-ed3a2ac8d214'
  },
  {
    id: 'piece-of-cake',
    title: 'Piece of Cake',
    category: 'Puzzle',
    description: 'Merge and bake delicious treats in this sweet and addictive adventure.',
    reward: 85,
    image: '🍰',
    isPlayable: true,
    externalUrl: 'https://playgama.com/export/game/piece-of-cake-merge--bake?clid=p_1d39008a-4873-4032-ae3c-ed3a2ac8d214'
  },
  {
    id: 'ragdoll-show',
    title: 'Ragdoll Show',
    category: 'Action',
    description: 'Physics-based playground fun! Perform stunts and cause mayhem.',
    reward: 90,
    image: '🤸',
    isPlayable: true,
    externalUrl: 'https://playgama.com/export/game/playground-man-ragdoll-show?clid=p_1d39008a-4873-4032-ae3c-ed3a2ac8d214'
  }
];

export const INITIAL_ACHIEVEMENTS = [
  { id: '1', title: 'First Steps', description: 'Play your first game on RewardCat', icon: '🐾', unlocked: true },
  { id: '2', title: 'Tycoon Status', description: 'Earn 500 coins in Millionaire Life', icon: '💎', unlocked: false },
  { id: '3', title: 'General', description: 'Play Age of Tanks for 10 minutes', icon: '🎖️', unlocked: false },
  { id: '4', title: 'Wealthy Whisker', description: 'Accumulate 1000 MeowCoins', icon: '💰', unlocked: false },
];

export const SAMPLE_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: 'PurrMaster99', score: 25420, avatar: '🦁' },
  { rank: 2, name: 'Clawdia', score: 18900, avatar: '🐆' },
  { rank: 3, name: 'ShadowPaws', score: 15250, avatar: '🐈‍⬛' },
  { rank: 4, name: 'WhiskersMaster', score: 2450, avatar: '🐱', isUser: true },
  { rank: 5, name: 'MeowMixer', score: 8700, avatar: '🐅' },
  { rank: 6, name: 'Felix_the_Cat', score: 6540, avatar: '🦁' },
  { rank: 7, name: 'GingerSnaps', score: 5320, avatar: '🐯' },
  { rank: 8, name: 'TomCat', score: 4900, avatar: '🐈' },
];
