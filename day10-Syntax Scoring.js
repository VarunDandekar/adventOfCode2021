const fs = require("fs");
let input = fs
  .readFileSync("day10.txt", { encoding: "utf8", flag: "r" })
  .split("\r\n");

let score = 0;
let completionScores = [];
for (let line of input) {
  let illigal = false;
  const stack = [];
  for (let char of line) {
    switch (char) {
      case "(":
      case "[":
      case "{":
      case "<":
        stack.push(char);
        break;
      case ")":
        if (stack[stack.length - 1] == "(") {
          stack.pop();
        } else {
          score += 3;
          illigal = true;
        }
        break;
      case ">":
        if (stack[stack.length - 1] == "<") {
          stack.pop();
        } else {
          score += 25137;
          illigal = true;
        }
        break;
      case "]":
        if (stack[stack.length - 1] == "[") {
          stack.pop();
        } else {
          score += 57;
          illigal = true;
        }
        break;
      case "}":
        if (stack[stack.length - 1] == "{") {
          stack.pop();
        } else {
          score += 1197;
          illigal = true;
        }
        break;
    }
    if (illigal) break;
  }
  if (illigal) continue;
  let completionScore = 0;
  for (let i = stack.length - 1; i >= 0; --i) {
    completionScore *= 5;
    switch (stack[i]) {
      case "(":
        completionScore += 1;
        break;
      case "[":
        completionScore += 2;
        break;
      case "{":
        completionScore += 3;
        break;
      case "<":
        completionScore += 4;
        break;
    }
  }
  completionScores.push(completionScore);
}

console.log("part1", score);
completionScores = completionScores.sort((a, b) => b - a);
console.log("part2", completionScores[(completionScores.length - 1) / 2]);
