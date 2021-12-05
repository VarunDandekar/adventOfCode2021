const fs = require("fs");
let input = fs
  .readFileSync("day4.txt", { encoding: "utf8", flag: "r" })
  .split("\n");

const numbers = input[0].split(",").map((x) => Number(x));
input.splice(0, 2);

const boards = [];
for (let line of input) {
  if (line == "") {
    continue;
  }
  boards.push(
    ...line
      .split(" ")
      .filter((x) => x !== "")
      .map((x) => Number(x))
  );
}
const boardsCopy = boards.slice();
const visited = [];
let winnerId = 0;
let start;
for (i of boards) visited[i] = false;
function tickNumber(val) {
  let found = false;
  for (let i = 0; i < boards.length; ++i) {
    if (boards[i] === val) {
      visited[i] = true;
      found = true;
    }
  }
  return found;
}

function checkWinner() {
  let row = true;
  for (let i = 0; i < visited.length; ++i) {
    // row check
    if (
      i % 5 == 0 &&
      visited[i] &&
      visited[i + 1] &&
      visited[i + 2] &&
      visited[i + 3] &&
      visited[i + 4]
    ) {
      console.log(
        "winner found row",
        boards[i],
        boards[i + 1],
        boards[i + 2],
        boards[i + 3],
        boards[i + 4]
      );
      winnerId = i;
      return true;
    }

    if (
      i % 25 < 5 &&
      visited[i] &&
      visited[i + 5] &&
      visited[i + 10] &&
      visited[i + 15] &&
      visited[i + 20]
    ) {
      console.log(
        "winner found col",
        boards[i],
        boards[i + 5],
        boards[i + 10],
        boards[i + 15],
        boards[i + 20]
      );
      winnerId = i;
      row = false;
      return true;
    }
  }
}

function getWinnerScore(num) {
  sum = 0;
  const board = Math.floor(winnerId / 25);
  start = board * 25;
  for (let i = start; i < start + 25; ++i) {
    if (!visited[i]) {
      sum += boards[i];
    }
  }
  return sum * num;
}

function printBoards() {
  let str = "";
  for (let i in boards) {
    if (i % 5 == 0) {
      console.log(str);
      console.log("\n");
      str = "";
    }
    if (i % 25 == 0) {
      console.log(" ==============================\n");
    }
    if (visited[i]) {
      str += "X ";
    } else {
      str += boards[i] + " ";
    }
  }
}

function part1() {
  for (num of numbers) {
    if (tickNumber(num) && checkWinner()) {
      console.log("Part1", getWinnerScore(num)); ////////////////part1
      //printBoards();
      break;
    }
  }
}

function part2() {
  let done = false;
  for (num of numbers) {
    if (tickNumber(num)) {
      while (checkWinner()) {
        if (boards.length == 25) {
          console.log("part2", getWinnerScore(num)); //////////// part2
          done = true;
          break;
        }
        const board = Math.floor(winnerId / 25);
        let startnum = board * 25;
        boards.splice(startnum, 25);
        visited.splice(startnum, 25);
      }
      if (done) break;
    }
  }
}

part2();
