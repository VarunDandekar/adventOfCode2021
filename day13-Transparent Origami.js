const fs = require("fs");
let input = fs
  .readFileSync("day13.txt", { encoding: "utf8", flag: "r" })
  .split("\r\n");

let points = [];
for (let line of input) {
  if (line == "") break;
  let [x, y] = line.split(",").map((x) => Number(x));
  points.push([x, y]);
}

for (let line of input) {
  if (!line.includes("fold")) continue;
  let [dir, quant] = line.split(" ")[2].split("=");
  if (dir == "y") {
    for (let pt of points) {
      if (pt[1] > quant) {
        pt[1] = quant * 2 - pt[1];
      }
    }
  } else if (dir == "x") {
    for (let pt of points) {
      if (pt[0] > quant) {
        pt[0] = quant * 2 - pt[0];
      }
    }
  }

  const xx = points.map((y) => String(y[0]) + "_" + String(y[1]));
  const yy = new Set(xx);
  points = [...yy].map((y) => [
    Number(y.split("_")[0]),
    Number(y.split("_")[1]),
  ]);
}

let maxX = Math.max(...points.map((y) => y[0]));
let maxY = Math.max(...points.map((y) => y[1]));
const xx = points.map((y) => String(y[0]) + "_" + String(y[1]));

for (let y = 0; y <= maxY; ++y) {
  let str = "";
  for (let x = 0; x <= maxX; ++x) {
    str += xx.includes(String(x) + "_" + String(y)) ? "#" : " ";
  }
  console.log(str);
  //console.log("\");
}
