const fs = require("fs");
let input = fs
  .readFileSync("day6.txt", { encoding: "utf8", flag: "r" })
  .split(",")
  .map((x) => Number(x));

const endDay = 256;
let fishes = [];
const x = {};
for (fish of input) {
  if (!x[String(fish - 6)]) {
    fishes.push(fish - 6);
    x[String(fish - 6)] = 1;
  } else {
    x[String(fish - 6)] += 1;
  }
}
let fishCount = input.length;
fishes = fishes.sort((a, b) => a - b);

while (fishes.length > 0) {
  const fish = fishes.shift();
  const mul = x[String(fish)];
  for (let day = fish; day <= endDay; day += 7) {
    if (day == fish) continue;
    fishCount += mul;
    if (!x[String(day + 2)]) {
      fishes.push(day + 2);
      x[String(day + 2)] = mul;
      fishes = fishes.sort((a, b) => a - b);
    } else {
      x[String(day + 2)] += mul;
    }
  }
}

console.log(fishCount);
