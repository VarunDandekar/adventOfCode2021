const fs = require("fs");
let input = fs
  .readFileSync("day14.txt", { encoding: "utf8", flag: "r" })
  .split("\r\n");
const rules = {};
let str = input[0];

for (line of input) {
  if (line.includes(" ->")) {
    const [key, val] = line.split(" -> ");
    rules[key] = key.split("")[0] + val + key.split("")[1];
  }
}

const steps = 40;
for (let step = 1; step <= steps; ++step) {
  console.log(step);
  let temp = "";
  for (let i = 0; i < str.length - 1; ++i) {
    const sub = str.substring(i, i + 2);
    temp += rules[sub] ? rules[sub].substring(0, 2) : sub[0];
  }
  temp += str[str.length - 1];
  str = temp;
}

const letters = {};
str.split("").forEach((x) => {
  if (letters[x]) {
    letters[x] += 1;
  } else {
    letters[x] = 1;
  }
});

console.log(
  "part1",
  Math.max(...Object.values(letters)) - Math.min(...Object.values(letters))
);
