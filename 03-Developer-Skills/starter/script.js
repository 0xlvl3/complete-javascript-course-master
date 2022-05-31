// Remember, we're gonna use strict mode in all scripts now!
"use strict";

/* 
4 steps to solve any problem

1. Make sure youu 100% understand the problem. Ask the right questions to get a clear picture of the problem.

2. Divide and conquer. Break a big problem into smaller sub-problems.

3. Don't be afraid to do as much research as you have to.

4. For bigger problems, write pseduo-code before writing the actual code.


const temperatures = [13, -2, -6, -1, "error", 9, 13, 17, 15, 14, 9, 5];

const calcTempAmplitude = function (temps) {
  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const currentTemp = temps[i];
    if (typeof currentTemp !== "number") continue;
    if (currentTemp > max) max = currentTemp;
    if (currentTemp < min) min = currentTemp;
  }
  console.log(max, min);
  return max - min;
};


const amplitude = calcTempAmplitude(temperatures);
console.log(amplitude);

const measureKelvin = function () {
  const measurement = {
    type: "temp",
    unit: "celsius",
    value: Number(prompt("Degrees celsius")),
  };
  const kelvin = measurement.value + 273;
  return kelvin;
};

console.log(measureKelvin());
*/

// Given an array of forecasted maximum temperatures, the thermometer displays a
// string with the given temperatures. Example: [17, 21, 23] will print "... 17ºC in 1 days ... 21ºC in 2 days ... 23ºC in 3 days ..."

// Your tasks:
// 1. Create a function 'printForecast' which takes in an array 'arr' and logs a
// string like the above to the console. Try it with both test datasets.
// 2. Use the problem-solving framework: Understand the problem and break it up
// into sub-problems!

// Test data:
// § Data 1: [17, 21, 23]
// § Data 2: [12, 5, -5, 0, 4]

//how I should have sloved this
// const printForcast = function (arr) {
//   let str = "";
//   for (let i = 0; i < arr.length; i++) {
//     str += `${arr[i]}ºC in ${i + 1} days ... `;
//   }
//   return `... ` + str;
// };

// console.log(printForcast([13, 12, 23]));

//how I tried to slove this
// const rePrintForcast = function (arr) {
//   let str = "";
//   for (let i = 0; i < arr.length; i++) {
//     str += arr.join(`in ${i + 1} days ...`);
//   }
//   return `... ` + str;
// };

// console.log(rePrintForcast([13, 12, 23]));

/*
A repo is a container for a porject you want to track with Git
Can have as many different repo's for many different projects on your computer
*/
