const fs = require("fs");
let input = fs
  .readFileSync("day6.txt", { encoding: "utf8", flag: "r" })
  .split(",")
  .map((x) => Number(x));

const endDay = 256;
const fishes = [];
for (fish of input) {
  fishes.push(fish - 6);
}
let fishCount = fishes.length;

while (fishes.length > 0) {
  const fish = fishes.shift();
  for (let day = fish; day <= endDay; day += 7) {
    if (day == fish) continue;
    ++fishCount;
    fishes.push(day + 2);
  }
}

console.log(fishCount);
