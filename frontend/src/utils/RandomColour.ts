const colors: string[] = [
  "zinc",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "voilet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
];

export default function RandomColour(): string {
  let randomNum = Math.floor(Math.random() * colors.length);
  return colors[randomNum];
}
