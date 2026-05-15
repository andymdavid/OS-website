export interface LevelUpGame {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

export const levelUpGames: LevelUpGame[] = [
  {
    id: "word5",
    title: "Word5",
    description: "Guess the word",
    image: "/Card01.webp",
    href: "",
  },
  {
    id: "pong",
    title: "Pong",
    description: "Classic arcade rally",
    image: "/pong.webp",
    href: "",
  },
  {
    id: "frogger",
    title: "Frogger",
    description: "Hop through traffic",
    image: "/frogger.webp",
    href: "",
  },
  {
    id: "chesstr",
    title: "Chesstr",
    description: "A playful chess variant",
    image: "/chesstr.webp",
    href: "",
  },
  {
    id: "bullrun",
    title: "Bullrun",
    description: "Dodge and survive",
    image: "/bullrun.webp",
    href: "",
  },
  {
    id: "lemmings",
    title: "Lemmings",
    description: "Guide the crowd safely",
    image: "/lemmings.webp",
    href: "",
  },
  {
    id: "cowkey",
    title: "Cowkey",
    description: "Farmyard chaos platformer",
    image: "/cowkey.webp",
    href: "",
  },
  {
    id: "scramble",
    title: "Scramble",
    description: "Fast word puzzle action",
    image: "/scramble.webp",
    href: "",
  },
  {
    id: "satsgarden",
    title: "Sats Garden",
    description: "Grow and collect",
    image: "/satsgarden.webp",
    href: "",
  },
];
