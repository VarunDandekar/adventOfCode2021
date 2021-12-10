const fs = require("fs");
let input = fs
  .readFileSync("day9.txt", { encoding: "utf8", flag: "r" })
  .split("\r\n");

input = input.map((x) => x.split("").map((y) => Number(y)));

const cols = input[0].length;
const rows = input.length;

let visiteds = {};

function getxy(x, y) {
  return String(x) + "_" + String(y);
}

function findSize(x, y) {
  if (visiteds[getxy(x, y)]) return 0;

  visiteds[getxy(x, y)] = true;

  if (x < 0 || x >= rows || y < 0 || y >= cols) {
    return 0;
  }
  const xy = input[x][y];
  if (xy == 9) {
    return 0;
  }
  return (
    1 +
    (x < rows - 1 && xy < input[x + 1][y] ? findSize(x + 1, y) : 0) +
    (x > 0 && xy < input[x - 1][y] ? findSize(x - 1, y) : 0) +
    (y < cols - 1 && xy < input[x][y + 1] ? findSize(x, y + 1) : 0) +
    (y > 0 && xy < input[x][y - 1] ? findSize(x, y - 1) : 0)
  );
}

let sum = 0;
let sizes = [];
for (let x = 0; x < rows; ++x) {
  for (let y = 0; y < cols; ++y) {
    const xy = input[x][y];
    if (x > 0 && xy >= input[x - 1][y]) {
      continue;
    }
    if (x < rows - 1 && xy >= input[x + 1][y]) {
      continue;
    }
    if (y > 0 && xy >= input[x][y - 1]) {
      continue;
    }
    if (y < cols - 1 && xy >= input[x][y + 1]) {
      continue;
    }
    sum += xy + 1;

    visiteds = {};
    sizes.push(findSize(x, y));
  }
}

console.log("part1", sum);

sizes = sizes.sort((a, b) => b - a);
console.log("part1", sizes[0] * sizes[1] * sizes[2]);
