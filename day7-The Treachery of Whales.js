const fs = require("fs");
let input = fs
  .readFileSync("day7.txt", { encoding: "utf8", flag: "r" })
  .split(",")
  .map((x) => Number(x));

//console.log(input);

let counts = {};
for (let num of input) {
  if (counts[num] !== undefined) {
    counts[num] += 1;
  } else {
    counts[num] = 1;
  }
}

//console.log(counts);
const max = Math.max(...Object.values(counts));
const mode = Object.keys(counts).find((x) => counts[x] === max);

const maxx = Math.max(...Object.keys(counts));
const minn = Math.min(...Object.keys(counts));
const fuels = [];

function part1() {
  for (let i = minn; i <= maxx; i++) {
    let fuel = 0;
    Object.entries(counts).forEach((cur) => {
      fuel += Math.abs(Number(cur[0]) - i) * cur[1];
    });
    fuels.push(fuel);
  }
  console.log("Part1", Math.min(...fuels)); //////////////// part1
}

function part2() {
  for (let i = minn; i <= maxx; i++) {
    let fuel = 0;
    Object.entries(counts).forEach((cur) => {
      const n = Math.abs(Number(cur[0]) - i);
      const s = (n * (n + 1)) / 2;
      fuel += s * cur[1];
    });
    fuels.push(fuel);
  }
  console.log("Part2", Math.min(...fuels)); //////////////// part1
}
part2();
