import { readline } from "https://deno.land/x/readline@v1.1.0/mod.ts";

const filename = 'trees';
const file = await Deno.open(filename);

const lines = [];

for await (const line of readline(file)) {
  const lineAsArr = new TextDecoder().decode(line).split("");
  for(let i=0; i < lineAsArr.length; i++){
    lineAsArr[i] = { tree: lineAsArr[i], visible: false };
  }
  lines.push(lineAsArr);
}

calculateVisibleTrees(lines); // From left
calculateVisibleTrees(prepareForViewFromTopOrBottom(lines)); // From top
calculateVisibleTrees(reverseLineOrder(lines), true); // From right
calculateVisibleTrees(reverseLineOrder(prepareForViewFromTopOrBottom(lines))); // From bottom

let totalNumberOfVisibleTrees = 0;
for (const line of lines) {
  const visibleTrees = line.filter ( (tree) => tree.visible);
  totalNumberOfVisibleTrees+= visibleTrees.length;
}

console.info('Visible trees: ', totalNumberOfVisibleTrees);

function calculateVisibleTrees(lines: []) {
  for (const line of lines) {
    line[0].visible = true;
    for (let i = line.length - 1; i > 0; i--) { // loop through all trees in line
      const treeToEvaluate = line[i];
      if(!isTreesInSightlineBlockView(treeToEvaluate, line.slice(0, i))){
        treeToEvaluate.visible = true;
      }
    }
  }
}

function isTreesInSightlineBlockView(treeToEvaluate: string, treesInSightline: string[]): boolean {
  for (const tree of treesInSightline) {
    if(parseInt(treeToEvaluate.tree) <= parseInt(tree.tree)){
      return true;
    }
  }
  return false;
}

function prepareForViewFromTopOrBottom(lines: string[]): string[]{
  const linesFromTop: string[] = [];
  for (let positionInLine = 0; positionInLine < lines[0].length; positionInLine++) {
    linesFromTop[positionInLine] = [];
      for (const line of lines) {
        linesFromTop[positionInLine].push(line[positionInLine]);
      }
  }
  return linesFromTop;
}

function reverseLineOrder(lines: string[]): string[]{
  const linesReversed = [];
  for (let positionInLine = 0; positionInLine < lines[0].length; positionInLine++) {
    linesReversed[positionInLine] = lines[positionInLine].reverse();
  }
  return linesReversed;
}