const fs = require("fs");
let input = fs
  .readFileSync("day1.txt", { encoding: "utf8", flag: "r" })
  .split("\r\n");

input = input.map((x) => Number(x));

function count(arr) {
  let incCount = 0;
  for (i = 0; i < arr.length - 1; ++i) {
    if (arr[i] < arr[i + 1]) {
      ++incCount;
    }
  }
  return incCount;
}

console.log("Part1", count(input)); /////////////////////////////////////// part1

const newArr = [];
for (i = 0; i < input.length - 2; ++i) {
  newArr.push(input[i] + input[i + 1] + input[i + 2]);
}

console.log("Part2", count(newArr)); /////////////////////////////////////// part2
