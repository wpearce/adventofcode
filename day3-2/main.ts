import { readline } from "https://deno.land/x/readline@v1.1.0/mod.ts";

const filename = 'rucksack';
const file = await Deno.open(filename);
let prioTotal = 0;

const lines = [];
for await (const line of readline(file)) {
  lines.push(new TextDecoder().decode(line));
}

for (let i=0; i < lines.length; i = i+3){
  const first = lines[i];
  const second = lines[i+1];
  const third = lines[i+2];
  prioTotal += getPrio(getIdenticItem(first, second, third));
}

console.info(prioTotal);

function getIdenticItem(first: [], second: [], third: []): string {
  for (const item of first){
    if(second.includes(item) && third.includes(item)) {
      return item;
    }
  }
  return '';
}

function getPrio(char: string): number {
    if(char.toUpperCase() === char){
      return char.charCodeAt(0) - 38; // uppercase 27-52
    }
  return char.charCodeAt(0) - 96; // lowercase 1-26
}
