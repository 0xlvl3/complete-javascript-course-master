'use strict';
// const bookings = [];

// const createBooking = function (
//   flightNum,
//   numPassengers = 3,
//   //we can use other parameters in our function parameters for defaults must be in order
//   price = 199 * numPassengers
// ) {
//   //ES5 way to add defaults to parameters
//   // numPassengers = numPassengers || 1
//   // price = price || 199

//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking(`LH123`);
// createBooking('LA123', 2, 399); //when we give a parameter a argument the defaults won't active, the given arguments will be written to the console

// const flight = 'LH234'; //primitive
// const jonas = {
//   name: 'Jonas Schmedtman',
//   passport: 239912339,
// };

// //flightNum being a primitive in this function will not be changed outside of the function nor inside, where as the object jonas will being a non-primitive
// const checkIn = function (flightNum, passenger) {
//   flightNum = 'Lh999';
//   passenger.name = 'Mr. ' + passenger.name;

//   if (passenger.passport === 239912339) {
//     alert('Check in');
//   } else alert(`Wrong passport`);
// };

// console.log(checkIn(flight, jonas));
// console.log(flight);
// console.log(jonas);

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 1000000000);
// };

// newPassport(jonas);
// console.log(jonas);
// checkIn(flight, jonas);

// const oneWord = function (str) {
//   return str.replace(/ /g, '').toLowerCase(); //removes all whitespace and makes a sentence one word
// };

// const upperFirstWord = function (str) {
//   const [first, second, ...others] = str.split(` `);
//   return [first.toUpperCase(), second.toUpperCase(), ...others].join(' ');
// };

// //higher-order function
// const transformer = function (str, fn) {
//   console.log(`Original string: ${str}`);
//   console.log(`Transformed string: ${fn(str)}`); //where we use the function fn in our high-order function

//   console.log(`Transformed by: ${fn.name}`);
// };

// transformer('JavaScript is the best', upperFirstWord); //passing a function into a high-order function
// console.log(`--`);
// transformer('JavaScript is the best', oneWord);

// const high5 = function () {
//   console.log('You clicked the body 🕵️‍♀️');
// };

// document.body.addEventListener('click', high5); //addEventListener is a high-order function and high5 is our callback function

// ['jonas', 'martha', 'adam'].forEach(high5); //JS uses callbacks all the time

// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

// const greeterHey = greet('Hey');
// greeterHey('Jonas');
// greeterHey('Steven');

// greet('Hello')('Jonas'); //

// const greetArrow = greeting => name => console.log(`${greeting} ${name}`);

// greetArrow('Hello')('Steve');
// greetArrow('Hello,')('Emma');

// const lufthansa = {
//   airLine: 'Lufthansa',
//   iataCode: 'LH',
//   bookings: [],
//   book(flightNum, name) {
//     console.log(
//       `${name} booked a seat on ${this.airLine} flight ${this.iataCode} ${flightNum}`
//     );
//     this.bookings.push({ flight: `${this.iataCode}`, flightNum, name });
//   },
// };

// lufthansa.book('TH2929', 'Jonas');
// lufthansa.book('TH92992', 'Mike Smith');
// console.log(lufthansa);

// const eurowings = {
//   name: 'Eurowings',
//   iataCode: 'EW',
//   bookings: [],
// };

// const book = lufthansa.book;

// // book(23, 'Sarah');
// book.call(eurowings, 23, 'Sarah Williams'); //method.call(object, arg1, arg2) call will take the this keyword in the book method and point it toward the object that is passed as the first parameter
// book.call(eurowings, 24, `James Stan`);
// console.log(eurowings);

// book.call(lufthansa, '20200202', 'Happy Gilmore');

// const swiss = {
//   airLine: 'Swiss Air Lines',
//   iataCode: 'SW',
//   bookings: [],
// };

// book.call(swiss, '2020', 'Jonas');
// book.call(swiss, 'U929', 'Mary');
// console.log(swiss);

// //Apply method
// const flightData = [583, 'George Data'];
// book.apply(swiss, flightData);
// book.call(swiss, ...flightData); //same as above, we don't use apply really anymore
// console.log(swiss);

// //Bind method
// // book.call(eurowings, 23, 'Sarah Williams');
// const bookEW = book.bind(eurowings); //we bind the book method here to the eurowings object by placing it in a variable named 'bookEW' now we can just call bookEW(arg1, arg2) instead of book.call(eurowings, arg1, arg2)
// bookEW(23, 'Sarah Williams');

// const bookLH = book.bind(lufthansa);
// const bookSW = book.bind(swiss);

// const bookEW23 = book.bind(eurowings, 23); //we can set default args with this as well, this will have 23 for our flightNum
// bookEW23('Jonas'); //example of using code from above

// //With event listeners
// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//   console.log(this);

//   this.planes++;
//   console.log(this.planes);
// };

// document
//   .querySelector('.buy')
//   .addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); //important

// //Parial application

// const addTax = (value, rate) => value + value * rate;

// console.log(addTax(0.1, 200));

// const addVAT = addTax.bind(null, 0.25);

// console.log(addVAT(100));

// // const addTaxRate = function (rate) {
// //   return function (value) {
// //     console.log(value + value * rate);
// //   };
// // };

// const taxTotal = function (rate, value, fn) {
//   console.log(`Your total for tax is: ${fn(rate, value)}`);
//   console.log(`${fn.name}`);
// };

// taxTotal(0.15, 200, addTax);

// Coding Challenge #1

// Let's build a simple poll app!
// A poll has a question, an array of options from which people can choose, and an

// array with the number of replies for each option. This data is stored in the starter 'poll' object below.

// Your tasks:
// 1. Create a method called 'registerNewAnswer' on the 'poll' object. The
// method does 2 things:

// 1.1. Display a prompt window for the user to input the number of the
// selected option. The prompt should look like this:
// What is your favourite programming language?
// 0: JavaScript
// 1: Python
// 2: Rust
// 3: C++
// (Write option number)

// 1.2. Based on the input number, update the 'answers' array property. For
// example, if the option is 3, increase the value at position 3 of the array by
// 1. Make sure to check if the input is a number and if the number makes
// sense (e.g. answer 52 wouldn't make sense, right?)

// 2. Call this method whenever the user clicks the "Answer poll" button.

// 3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1".

// 4. Run the 'displayResults' method at the end of each'registerNewAnswer' method call.

// 5. Bonus: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll object! So what should the this keyword look like in this situation?

// Test data for bonus:
// § Data 1: [5, 2, 3]
// § Data 2: [1, 5, 3, 9, 6, 1]
// Hints: Use many of the tools you learned about in this and the last section 😉
// GOOD LUCK 😀

// const poll = {
//   question: 'What is your favourite programming language?',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//   // This generates [0, 0, 0, 0]. More in the next section!
//   answers: new Array(4).fill(0),
//   registerNewAnswer() {
//     //get answer
//     const answer = Number(
//       prompt(
//         `${this.question}\n${this.options.join(
//           '\n'
//         )}\n(Please input a number option above 🔢)`
//       )
//     );
//     // console.log(answer);

//     //register answer
//     typeof answer === 'number' &&
//       answer < this.answers.length &&
//       this.answers[answer]++; //using short-circuiting with && to confirm all are true before executing the last condition

//     // console.log(this.answers);
//     this.displayResults();
//     this.displayResults(`string`);
//   },

//   displayResults(type = 'array') {
//     if (type === 'array') {
//       console.log(this.answers);
//     } else if (type === 'string') {
//       console.log(`Poll results are ${this.answers.join(`, `)}`);
//     }
//   },
// };

// //will call registerNewAnswer when clicked
// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));

// const results = poll.displayResults;

// console.log(results.call({ answers: [5, 2, 3] }, 'string'));
// // § Data 1: [5, 2, 3]
// // § Data 2: [1, 5, 3, 9, 6, 1]

// const runOnce = function () {
//   console.log(`This will never run again`);
// };
// runOnce();

// //immediately invoked function expression or IIFE
// (function () {
//   console.log(`This will never run again`);
// })();
// //immediately invoked arrow function expression
// (() => console.log(`This will ALSO never run again`))();

//closures happen automatically
// const secureBooking = function () {
//   let passengerCount = 0;

//   return function () {
//     passengerCount++;
//     console.log(`${passengerCount} passengers`);
//   };
// };

// const booker = secureBooking();

// booker();
// booker();
// booker();

// console.dir(booker);

//example 1
// let f;

// const g = function () {
//   const a = 23;
//   f = function () {
//     console.log(a * 2);
//   };
// };

// const h = function () {
//   const b = 777;

//   f = function () {
//     console.log(b * 2);
//   };
// };

// g();
// f();
// console.dir(f);

// //re-assigning f function
// h();
// f();
// console.dir(f);

// //example 2
// const boardPassengers = function (n, wait) {
//   const perGroup = n / 3;

//   setTimeout(function () {
//     console.log(`We are now boarding all ${n} passengers`);
//     console.log(`There are 3 groups, each with ${perGroup} passengers`);
//   }, wait * 1000);

//   console.log(`Will start boarding in ${wait} seconds`);
// };

// boardPassengers(180, 3);

// setTimeout(function () {
//   console.log(`Timer`);
// }, 2000);

// (function () {
//   const header = document.querySelector('h1');
//   header.style.color = 'red';

//   document.querySelector('body').addEventListener('click', function () {
//     header.style.color = 'blue';
//   });
// })();
