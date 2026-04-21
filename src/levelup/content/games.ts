export interface LevelUpGame {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

export const levelUpGames: LevelUpGame[] = [
  {
    id: "1",
    title: "Bullrun",
    description: "Dodge the bulls",
    image: "/bullrun.webp",
    href: "https://bullrun.otherstuff.ai",
  },
  {
    id: "2",
    title: "Cowkey Kong",
    description: "Keep climbing",
    image: "/cowkey.webp",
    href: "https://cowkong.otherstuff.ai",
  },
  {
    id: "3",
    title: "Frogger",
    description: "Avoid the cards",
    image: "/frogger.webp",
    href: "https://frogger.otherstuff.ai",
  },
  {
    id: "4",
    title: "Lemmings",
    description: "Classic lemmings",
    image: "/lemmings.webp",
    href: "https://lemmings.otherstuff.ai",
  },
  {
    id: "5",
    title: "Pong",
    description: "Classic Pong",
    image: "/pong.webp",
    href: "https://pong.otherstuff.ai",
  },
  {
    id: "6",
    title: "Satoshi's Garden",
    description: "Stack sats",
    image: "/satsgarden.webp",
    href: "https://satsgarden.otherstuff.ai",
  },
  {
    id: "7",
    title: "Chesstr",
    description: "Play chess",
    image: "/chesstr.webp",
    href: "https://chesstr.otherstuff.ai",
  },
  {
    id: "8",
    title: "Scramble",
    description: "Navigate the cave",
    image: "/scramble.webp",
    href: "https://scramble.otherstuff.ai",
  },
];
