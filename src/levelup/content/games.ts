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
    image: "/bullrun.png",
    href: "https://bullrun.otherstuff.ai",
  },
  {
    id: "2",
    title: "Cowkey Kong",
    description: "Keep climbing",
    image: "/cowkey.png",
    href: "https://cowkong.otherstuff.ai",
  },
  {
    id: "3",
    title: "Frogger",
    description: "Avoid the cards",
    image: "/frogger.png",
    href: "https://frogger.otherstuff.ai",
  },
  {
    id: "4",
    title: "Lemmings",
    description: "Classic lemmings",
    image: "/lemmings.png",
    href: "https://lemmings.otherstuff.ai",
  },
  {
    id: "5",
    title: "Pong",
    description: "Classic Pong",
    image: "/pong.png",
    href: "https://pong.otherstuff.ai",
  },
  {
    id: "6",
    title: "Satoshi's Garden",
    description: "Stack sats",
    image: "/satsgarden.png",
    href: "https://satsgarden.otherstuff.ai",
  },
  {
    id: "7",
    title: "Chesstr",
    description: "Play chess",
    image: "/chesstr.png",
    href: "https://chesstr.otherstuff.ai",
  },
  {
    id: "8",
    title: "Scramble",
    description: "Navigate the cave",
    image: "/scramble.png",
    href: "https://scramble.otherstuff.ai",
  },
];
