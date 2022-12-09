import { readline } from "https://deno.land/x/readline@v1.1.0/mod.ts";

const filename = 'spaces';
const file = await Deno.open(filename);
let fullyContainsCount = 0;

for await (const line of readline(file)) {
  const decodedLine = new TextDecoder().decode(line);
  const pairs = decodedLine.split(',');
  if ( isOnePairFullyContainedInOther(pairs[0].split('-'), pairs[1].split('-'))) {
    fullyContainsCount++;
  }
}

console.info(fullyContainsCount);

function isOnePairFullyContainedInOther(first: [], second: []): boolean {
  const firstAsInt = first.map( char => parseInt(char));
  const secondAsInt = second.map( char => parseInt(char));
  return (firstAsInt[0] >= secondAsInt[0] && firstAsInt[1] <= secondAsInt[1]) ||
      (secondAsInt[0] >= firstAsInt[0] && secondAsInt[1] <= firstAsInt[1]);
}
