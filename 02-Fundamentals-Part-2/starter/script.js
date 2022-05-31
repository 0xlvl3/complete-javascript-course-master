"use strict";

/*

//object
const person = {

    //properties are nouns
    firstName: 'Kyle',
    lastName: "Anderson",
    birthday: 1995,
    job: 'fitter',
    hasDriversLicense: false,

    //methods are verbs

    //bringing a function into a object as a property we call it a method
    //below is how we write a method longhand for a object, must be a function expression

    // calcAge: function (birthYear) {
    //     return 2037 - birthYear;
    // }

    //below this is shorthand
    
    // calcAge: birthYear => {
    //     return 2037 - birthYear;
    // }

    // using this keyword with a property within the object
    calcAge: function () {
        this.age = 2037 - this.birthday
        return this.age; //this points to the property birthday as a reference
    },

    //working in the this. method a number of ways with a method in person object
    getSummary: function () {
        return `${this.firstName} is a ${this.job} he is currently age ${this.calcAge()} and he currently has ${this.hasDriversLicense ? 'a' : 'no'} drivers license.`;
    }
};

console.log(person.calcAge()); //acessing that method
console.log(person.getSummary()); //accessing getSummary method

//arrays are just objects as well, hence why we can use .push, .pop, .shift on arrays


Challenge 3
------------
Let's go back to Mark and John comparing their BMIs! This time, let's use objects to implement the calculations! Remember: BMI = mass / height ** 2 = mass
/ (height * height) (mass in kg and height in meter)

Your tasks:
1. For each of them, create an object with properties for their full name, mass, and height (Mark Miller and John Smith)
2. Create a 'calcBMI' method on each object to calculate the BMI (the same
method on both objects). Store the BMI value to a property, and also return it
from the method
3. Log to the console who has the higher BMI, together with the full name and the
respective BMI. Example: "John's BMI (28.3) is higher than Mark's (23.9)!"

Test data: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m
tall.


const john = {
    fullName: 'John Smith',
    mass: 92,
    height: 1.95,

    I tried to use

    calcBMI: () => {
        this.bmi = this.mass / this.height ** 2;
        return this.bmi.toPrecision(4);
    }

    but I would get NaN as a return, used the following below and got the correct value
    
    calcBMI: function () {
        //this.bmi creates a new property within the object
        this.bmi = this.mass / this.height ** 2;
        return this.bmi.toPrecision(4);
    }
}
const mark = {
    fullName: 'Mark Miller',
    mass: 78,
    height: 1.69,
    
    calcBMI: function () {
        this.bmi = this.mass / this.height ** 2;
        return this.bmi.toPrecision(4);
    }
}

//since we haven't ran our method yet bmi is undefinded here
console.log(john.bmi);
console.log(john.calcBMI());
//after we run our method a new property bmi is available to be called for john object
console.log(john.bmi);
console.log(mark.calcBMI());

//logging to the console who has the higher bmi depending on values
const checkWinner = function () {
    if (john.bmi > mark.bmi) {
        return `${john.fullName}'s BMI ${john.bmi.toPrecision(4)} is higher than ${mark.fullName}'s ${mark.bmi.toPrecision(4)}!`
    } else {
        return `${mark.fullName}'s BMI ${mark.bmi.toPrecision(4)} is higher than ${john.fullName}'s BMI ${john.bmi.toPrecision(4)}!`
    }
}

//logging the final output.
const winner = checkWinner();
console.log(winner);

//finished Challenge 3

//loops

for (let i = 0; i <= 10; i++)
{
    console.log(`The number is now ${i}`);
}

//array we will loop through, loops are usually used for looping through arrays
const jonasArray = [
    'Jonas',
    'Schmedtmann',
    2037 - 1991,
    'teacher',
    ['Michael', 'Peter', 'Steven']
];

//create a new array with no values outside of for loop
const test1 = [];
const test2 = [];

for (let i = 0; i < jonasArray.length; i++)
{
    console.log(jonasArray[i]); //reading from jonasArray and printing each value to the console
    test1[i] = typeof jonasArray[i] //add typeof values from jonasArray to test1 array
    test2.push(jonasArray[i]); //using push method in forloop to push values into test2 array from jonasArray
}

console.log(test1); //test
console.log(test2); //test

const years = [1991, 2007, 1969, 2020];
const ages = [];

for (let i = 0; i < years.length; i++){
    ages.push(2037 - years[i]); //using push method to fill ages array with results from expression
}

//continue and break

console.log('-------ONLY STRINGS---------')
for (let i = 0; i < jonasArray.length; i++){
    if (typeof jonasArray[i] !== 'string') continue; //continue keyword will only continue if typeof is of type string all others will be ignored
    console.log(jonasArray[i]);
}
console.log('-----Break after number------')
for (let i = 0; i < jonasArray.length; i++){
    if (typeof jonasArray[i] === 'number') break; //will break loop when first number is found

    console.log(jonasArray[i]);
}




const jonasArray = [
    'Jonas',
    'Schmedtmann',
    2037 - 1991,
    'teacher',
    ['Michael', 'Peter', 'Steven']
];

//looping through an array backwards
for (let i = jonasArray.length - 1; i >= 0; i--){
    console.log(jonasArray[i]);
}

//loop inside a loop

for (let excercise = 1; excercise < 4; excercise++){
    console.log(`-----Starting excerise ${excercise}`);
    //rep will loop until finished then it will go back to excercise loop and repeat
    for (let rep = 1; rep < 6; rep++){
        console.log(`Lifting weight repetition ${rep}`);
    }
}
//example of one iteration through that for loop
// -----Starting excerise 1
// Lifting weight repetition 1
// Lifting weight repetition 2
// Lifting weight repetition 3
// Lifting weight repetition 4
// Lifting weight repetition 5


//while loop
let rep = 1;
while (rep <= 10) {
    console.log(`Rep number has increased from: ${rep}`);
    rep++;
}

let rollDice = Math.trunc(Math.random() * 10) + 1;
while (rollDice !== 6) {
    console.log(`You rolled a ${rollDice}`);
    rollDice = Math.trunc(Math.random() * 10) + 1
    if (rollDice === 6) {
        console.log(`loop ending you rolled a 6`);
    }
}

//Challenge 4


Let's improve Steven's tip calculator even more, this time using loops!
Your tasks:

1. Create an array 'bills' containing all 10 test bill values

2. Create empty arrays for the tips and the totals ('tips' and 'totals')

3. Use the 'calcTip' function we wrote before (no need to repeat) to calculate
tips and total values (bill + tip) for every bill value in the bills array. Use a for loop to perform the 10 calculations!


Test data: 22, 295, 176, 440, 37, 105, 10, 1100, 86 and 52


Hints: Call ‘calcTip ‘in the loop and use the push method to add values to the
tips and totals arrays

Bonus:

4. Bonus: Write a function 'calcAverage' which takes an array called 'arr' as
an argument. This function calculates the average of all numbers in the given
array. This is a difficult challenge (we haven't done this before)! Here is how to solve it:
4.1. First, you will need to add up all values in the array. To do the addition,
start by creating a variable 'sum' that starts at 0. Then loop over the
array using a for loop. In each iteration, add the current value to the
'sum' variable. This way, by the end of the loop, you have all values
added together
4.2. To calculate the average, divide the sum you calculated before by the
length of the array (because that's the number of elements)
4.3. Call the function with the 'totals' array

*/

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

console.log(bills);

const calcTip = (bill) => {
  if (bill > 50 && bill < 300) {
    return bill * 0.15;
  } else {
    return bill * 0.2;
  }
};

for (let i = 0; i < bills.length; i++) {
  tips.push(calcTip(bills[i]));
}

console.log(tips);

for (let i = 0; i < bills.length; i++) {
  totals.push(bills[i] + tips[i]);
}

console.log(totals);

const calcAverage = (arr) => {
  let sum = 0;
  //calculates sum of all integers in array
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  //return total sum of all integers averaged to length of the array
  return sum / arr.length;
};

const totalAverage = calcAverage(totals);
console.log(totalAverage);
const tipAverage = calcAverage(tips);
console.log(tipAverage);
