const fs = require("fs");
let input = fs
  .readFileSync("day8.txt", { encoding: "utf8", flag: "r" })
  .split("\r\n");

function part1() {
  let count = 0;
  for (let line of input) {
    const nums = line.split(" | ")[1].split(" ");
    nums.forEach((x) => {
      if (x.length == 2 || x.length == 3 || x.length == 4 || x.length == 7) {
        count++;
      }
    });
  }

  console.log("part1", count); ///////////////////// part1
}

function part2() {
  let sum = 0;
  for (let line of input) {
    const nums = line.split(" | ")[0].split(" ");
    let zero, one, two, three, four, five, six, seven, eight, nine;
    let topHor, midHor, bottHor, leftTop, leftBot, rightTop, rightBot;

    one = nums.filter((x) => x.length == 2)[0].split(""); ////////////////// one
    seven = nums.filter((x) => x.length == 3)[0].split(""); /////////////////// seven
    four = nums.filter((x) => x.length == 4)[0].split(""); //////////////////// four
    eight = nums.filter((x) => x.length == 7)[0].split(""); ///////////////// eight

    ///////// topHor
    [topHor] = seven.filter((x) => !one.includes(x)); /////////////// topHor
    //console.log("topHor", topHor);

    ///botHor
    const four_seven = [...four, ...seven, topHor];
    const nines = nums.filter((x) => x.length == 6);
    [nine] = nines.filter((x) =>
      four_seven.every((y) => x.split("").includes(y))
    );
    nine = nine.split(""); ////////////////////////////// nine
    [bottHor] = nine.filter((x) => !four_seven.includes(x));
    //console.log("bottHor", bottHor); //////////////////////////// botthor

    // midHor
    const one_hors = [...one, topHor, bottHor];
    const threes = nums.filter((x) => x.length == 5);
    [three] = threes.filter((x) =>
      one_hors.every((y) => x.split("").includes(y))
    );
    three = three.split(""); //////////////////// three
    [midHor] = three.filter((x) => !one_hors.includes(x));
    // console.log("midHor", midHor); /////////////////////////midHor

    // leftTop
    const one_mid = [...one, midHor];
    [leftTop] = four.filter((x) => !one_mid.includes(x));
    // console.log("leftTop", leftTop); ////////////////////////// leftTop

    // leftBot
    const forEight = [...one, midHor, leftTop, topHor, bottHor];
    [leftBot] = eight.filter((x) => !forEight.includes(x));
    // console.log("leftBot", leftBot); ////////////////////////// leftBot

    // rightBot
    const forSix = [topHor, midHor, bottHor, leftBot, leftTop];
    const sixes = nums.filter((x) => x.length == 6);
    [six] = sixes.filter((x) => forSix.every((y) => x.split("").includes(y)));
    six = six.split(""); //////////////////// six
    [rightBot] = six.filter((x) => !forSix.includes(x));
    // console.log("rightBot", rightBot); /////////////////////////rightBot

    /// rightTop
    const forRightTop = [leftBot, rightBot, midHor, leftTop, topHor, bottHor];
    [rightTop] = eight.filter((x) => !forRightTop.includes(x));
    //console.log("rightBot", rightTop); ////////////////////////// rightTop

    /// zero
    zero = [topHor, rightTop, rightBot, bottHor, leftBot, leftTop]; /////////// zero

    // two
    two = [topHor, midHor, bottHor, rightTop, leftBot]; ///////////////////// two

    // five
    five = [topHor, midHor, bottHor, rightBot, leftTop]; //////////////// five

    const numbers = line.split(" | ")[1].split(" ");
    let numString = "";
    for (let n of numbers) {
      if (checkNum(n, one)) numString += "1";
      else if (checkNum(n, two)) numString += "2";
      else if (checkNum(n, three)) numString += "3";
      else if (checkNum(n, four)) numString += "4";
      else if (checkNum(n, five)) numString += "5";
      else if (checkNum(n, six)) numString += "6";
      else if (checkNum(n, seven)) numString += "7";
      else if (checkNum(n, eight)) numString += "8";
      else if (checkNum(n, nine)) numString += "9";
      else if (checkNum(n, zero)) numString += "0";
    }

    sum += parseInt(numString);
  }

  console.log(sum);
}
part2();

function checkNum(x, y) {
  if (x.length !== y.length) return;
  return x.split("").every((c) => y.includes(c));
}
