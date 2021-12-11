const fs = require("fs");
let input = fs
  .readFileSync("day11.txt", { encoding: "utf8", flag: "r" })
  .split("\r\n");
input = input.map((x) => x.split("").map((y) => Number(y)));

let visited = {};
let flashes = 0;
function getxy(x, y) {
  return String(x) + "_" + String(y);
}

function recursiveFlash(x, y) {
  if (x < 0 || x >= 10 || y < 0 || y >= 10) return;
  if (visited[getxy(x, y)]) return;
  ++input[x][y];
  if (input[x][y] > 9) {
    ++flashes;
    visited[getxy(x, y)] = true;
    recursiveFlash(x - 1, y - 1);
    recursiveFlash(x - 1, y);
    recursiveFlash(x - 1, y + 1);
    recursiveFlash(x, y - 1);
    recursiveFlash(x, y + 1);
    recursiveFlash(x + 1, y - 1);
    recursiveFlash(x + 1, y);
    recursiveFlash(x + 1, y + 1);
    input[x][y] = 0;
  }
}

let steps = 100;
for (let i = 1; ; ++i) {
  visited = {};
  for (let x = 0; x < 10; ++x) {
    for (let y = 0; y < 10; ++y) {
      recursiveFlash(x, y);
    }
  }
  // par2///////////////////////
  if (input.every((x) => x.every((y) => y == 0))) {
    console.log(i);
    break;
  }
  //////////////////////////
}

console.log(flashes);
