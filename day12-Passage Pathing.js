const fs = require("fs");
let input = fs
  .readFileSync("day12.txt", { encoding: "utf8", flag: "r" })
  .split("\r\n");

const smallCaves = [];
const paths = {};

for (line of input) {
  let [src, dest] = line.split("-");
  if (
    src !== "start" &&
    src !== "end" &&
    97 <= src.charCodeAt(0) &&
    src.charCodeAt(0) <= 122
  ) {
    if (!smallCaves.includes(src)) {
      smallCaves.push(src);
    }
  }

  if (
    dest !== "start" &&
    dest !== "end" &&
    97 <= dest.charCodeAt(0) &&
    dest.charCodeAt(0) <= 122
  ) {
    if (!smallCaves.includes(dest)) {
      smallCaves.push(dest);
    }
  }

  if (src !== "end" && dest !== "start") {
    if (paths[src] !== undefined) {
      paths[src].push(dest);
    } else {
      paths[src] = [dest];
    }
  }
  if (src !== "start" && dest !== "end") {
    if (paths[dest] !== undefined) {
      paths[dest].push(src);
    } else {
      paths[dest] = [src];
    }
  }
}

//console.log(smallCaves, paths);
let count = 0;

function findPaths(src, visitedArr, path, visited) {
  //console.log("=============================", src, visitedArr, path);
  if (src == "start") {
    visitedArr = [].slice();
    path = "";
    visited = false;
  }

  path += " " + src;
  if (src == "end") {
    ++count;
    //   console.log(path);
    return;
  }

  if (smallCaves.includes(src) && visitedArr.includes(src) && visited) {
    //console.log(src, "already");
    return;
  }

  if (smallCaves.includes(src) && visitedArr.includes(src) && !visited) {
    visited = true;
  } else if (smallCaves.includes(src)) {
    visitedArr.push(src);
  }

  if (paths[src] == undefined) return;

  for (let newSrc of paths[src]) {
    if (paths[newSrc] == undefined && newSrc !== "end") continue;
    findPaths(newSrc, visitedArr.slice(), path, visited);
  }
}

findPaths("start");
console.log(count);
