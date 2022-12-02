import { readline } from "https://deno.land/x/readline@v1.1.0/mod.ts";

const filename = 'strategy';
const file = await Deno.open(filename);
let myScore = 0;
let counter = 0;
for await (const line of readline(file)) {
  counter++;
  const decodedLine = new TextDecoder().decode(line);
  const opponent = decodedLine.substring(0,1);
  const me = decodedLine.substring(2,3);
  myScore += calculateScore(opponent,me);
  console.info(`${counter} - ${myScore}`);
}

console.info(myScore);

function calculateScore(opponent: string, me: string): number {
  if (me === 'X') {
    if (opponent === 'A') return 3;
    if (opponent === 'B') return 1;
    if (opponent === 'C') return 2;
  } else if (me === 'Y') {
    if (opponent === 'A') return 4;
    if (opponent === 'B') return 5;
    if (opponent === 'C') return 6;
  } else {
    if (opponent === 'A') return 8;
    if (opponent === 'B') return 9;
    if (opponent === 'C') return 7;
  }
  return 0;
}
