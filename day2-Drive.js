const fs = require("fs");
let input = fs
  .readFileSync("day2.txt", { encoding: "utf8", flag: "r" })
  .split("\n");

let horizontal = 0;
let depth = 0;

for (const line of input) {
  let [dir, amount] = line.split(" ");
  switch (dir) {
    case "forward":
      horizontal += Number(amount);
      break;
    case "up":
      depth -= Number(amount);
      break;
    case "down":
      depth += Number(amount);
      break;
  }
}

console.log("part1", horizontal * depth); ////////////////////////////////////// part1

horizontal = 0;
depth = 0;
let aim = 0;

for (const line of input) {
  let [dir, amount] = line.split(" ");
  switch (dir) {
    case "forward":
      horizontal += Number(amount);
      depth += aim * Number(amount);
      break;
    case "up":
      aim -= Number(amount);
      break;
    case "down":
      aim += Number(amount);
      break;
  }
}

console.log("part2", horizontal * depth); ////////////////////////////////////// part2
