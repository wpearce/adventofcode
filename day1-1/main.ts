import { readline } from "https://deno.land/x/readline@v1.1.0/mod.ts";

const filename = 'elvefood';
const file = await Deno.open(filename);
const foods = [];
let currentFoodCount = 0;
for await (const line of readline(file)) {
  const decodedLine = new TextDecoder().decode(line);
  if (decodedLine !== '') {
    currentFoodCount += parseInt(decodedLine);
  } else {
    foods.push(currentFoodCount);
    currentFoodCount = 0;
  }
}

//foods.forEach(food => console.log(food));

console.info(Math.max(...foods));