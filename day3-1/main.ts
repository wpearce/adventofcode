import { readline } from "https://deno.land/x/readline@v1.1.0/mod.ts";

const filename = 'rucksack';
const file = await Deno.open(filename);
let prioTotal = 0;
for await (const line of readline(file)) {
  const decodedLine = new TextDecoder().decode(line);
  const stringLength = decodedLine.length;
  const firstCompartment = decodedLine.substring(0,stringLength/2).split("");
  const secondCompartment = decodedLine.substring(stringLength/2, stringLength).split("");
  prioTotal += getIdenticItem(firstCompartment, secondCompartment);
}

console.info(prioTotal);

function getIdenticItem(firstCompartment, secondCompartment){
  for (const firstItem of firstCompartment){
    for (const secondItem of secondCompartment){
      if(firstItem === secondItem){
        return getPrio(firstItem);
      }
    }
  }
}

function getPrio(char: string): number {
    if(char.toUpperCase() === char){
      return char.charCodeAt(0) - 38; // uppercase 27-52
    }
  return char.charCodeAt(0) - 96; // lowercase 1-26
};
