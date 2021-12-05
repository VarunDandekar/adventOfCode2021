const fs = require("fs");
let input = fs
  .readFileSync("day5.txt", { encoding: "utf8", flag: "r" })
  .split("\r\n");

function getxy(x, y) {
  return String(x) + "," + String(y);
}

function part1() {
  const basicMap = {};
  for (line of input) {
    let [p1, p2] = line.split(" -> ");
    let [p1x, p1y] = p1.split(",").map((x) => Number(x));
    let [p2x, p2y] = p2.split(",").map((x) => Number(x));
    if (p1x !== p2x && p1y !== p2y) {
      // ignore diagonal
      continue;
    }
    if (p1x == p2x) {
      if (p1y > p2y) {
        const temp = p1y;
        p1y = p2y;
        p2y = temp;
      }
    } else if (p1y == p2y) {
      if (p1x > p2x) {
        const temp = p1x;
        p1x = p2x;
        p2x = temp;
      }
    }

    for (let x = p1x; x <= p2x; ++x) {
      for (let y = p1y; y <= p2y; ++y) {
        if (basicMap[getxy(x, y)] == undefined) {
          basicMap[getxy(x, y)] = 1;
        } else {
          basicMap[getxy(x, y)] += 1;
        }
      }
    }
  }

  const danger = Object.values(basicMap).filter((val) => {
    return val > 1;
  });

  console.log("part1", danger.length); ///////////////// part1
}

function part2() {
  const basicMap = {};
  for (line of input) {
    let [p1, p2] = line.split(" -> ");
    let [p1x, p1y] = p1.split(",").map((x) => Number(x));
    let [p2x, p2y] = p2.split(",").map((x) => Number(x));

    let stepx = 1;
    let stepy = 1;
    if (p1x == p2x || p1y == p2y) {
      if (p1x == p2x) {
        if (p1y > p2y) {
          const temp = p1y;
          p1y = p2y;
          p2y = temp;
        }
      } else if (p1y == p2y) {
        if (p1x > p2x) {
          const temp = p1x;
          p1x = p2x;
          p2x = temp;
        }
      }
      for (let x = p1x; x <= p2x; ++x) {
        for (let y = p1y; y <= p2y; ++y) {
          if (basicMap[getxy(x, y)] == undefined) {
            basicMap[getxy(x, y)] = 1;
          } else {
            basicMap[getxy(x, y)] += 1;
          }
        }
      }
    } else {
      if (p1x > p2x) {
        stepx = -1;
      }
      if (p1y > p2y) {
        stepy = -1;
      }

      for (
        let x = p1x, y = p1y, i = 0;
        i <= Math.abs(p1x - p2x);
        x += stepx, y += stepy, i++
      ) {
        if (basicMap[getxy(x, y)] == undefined) {
          basicMap[getxy(x, y)] = 1;
        } else {
          basicMap[getxy(x, y)] += 1;
        }
      }
    }
  }

  const danger = Object.values(basicMap).filter((val) => {
    return val > 1;
  });

  console.log("part2", danger.length); ///////////////// part2
}

part2();
