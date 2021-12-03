const fs = require("fs");
let input = fs
  .readFileSync("day3.txt", { encoding: "utf8", flag: "r" })
  .split("\n");

const noOfBits = input[0].length;
const zeros = [];
const ones = [];
for (let i = 0; i < noOfBits; ++i) {
  zeros[i] = ones[i] = 0;
}

for (const line of input) {
  for (let i = 0; i < noOfBits; ++i) {
    line[i] == "0" ? (zeros[i] += 1) : (ones[i] += 1);
  }
}

let gamma = "";
let epselon = "";
for (let i = 0; i < noOfBits; ++i) {
  if (zeros[i] > ones[i]) {
    gamma += "0";
    epselon += "1";
  } else {
    gamma += "1";
    epselon += "0";
  }
}

console.log("par1", parseInt(gamma, 2) * parseInt(epselon, 2)); ///////////////////////////PART1

let o2Arr = input.slice();
for (let i = 0; i < noOfBits; ++i) {
  if (o2Arr.length === 1) {
    break;
  }

  let zero = 0;
  let one = 0;
  for (const line of o2Arr) {
    line[i] == "0" ? (zero += 1) : (one += 1);
  }

  const o2Bit = zero > one ? "0" : "1";
  o2Arr = o2Arr.filter((x) => x[i] == o2Bit);
}

let co2Arr = input.slice();
for (let i = 0; i < noOfBits; ++i) {
  if (co2Arr.length === 1) {
    break;
  }

  let zero = 0;
  let one = 0;
  for (const line of co2Arr) {
    line[i] == "0" ? (zero += 1) : (one += 1);
  }

  const co2Bit = zero > one ? "1" : "0";
  co2Arr = co2Arr.filter((x) => x[i] == co2Bit);
}

console.log("part2", parseInt(o2Arr[0], 2) * parseInt(co2Arr[0], 2)); ///////////////////////////PART2
