'use strict';

const openingHours = {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours,

  //function will take a number input that is set at the index of the arrays above
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]; //we use the this keyword here to point to the restaurant block.
  },
  //ES6 enhanced object
  // openingHours,

  orderDelievery(obj) {
    console.log(obj);
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

const airLine = `TAP Air Portugal`;
const plane = `A320`;

console.log(airLine.indexOf(`r`));
console.log(airLine.indexOf(`Portugal`)); //case sensitive
console.log(airLine.lastIndexOf(`r`));
console.log(airLine.lastIndexOf(`R`)); //won't be found (case sensitive)

console.log(airLine.slice(4)); //returns Air Portugal
console.log(airLine.slice(4, 7)); //returns Air
console.log(airLine.slice(0, 3)); //returns TAP extracting a whole word
console.log(airLine.slice(airLine.lastIndexOf(` `) + 1)); //returns the last word, +1 takes away the space as it's going off the index
console.log(airLine.slice(-2)); //returns -al, - will return the last word indexing on

const checkMiddleSeat = function (seat) {
  //B & E are middle seats
  const s = seat.slice(-1);
  if (s === `B` || s === `E`) {
    console.log(`You got the middle seat`);
  } else console.log(`You got lucky`);
};

//whenever we call a method on a string behind the scenes JavaScript will convert the string to an object and then when the operation is done it is converted back to a regular string primitive

checkMiddleSeat(`11B`);
checkMiddleSeat(`23C`);
checkMiddleSeat(`3E`);

//taking input from a user and giving them back the correct format we want
const passenger = `jOnAs`; // should be Jonas

const passengerLower = passenger.toLowerCase(); // first we lowercase the whole string
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1); //then we uppcase the 0 index which is `J` in this case and + it will the silce of passengerLower from index 1 to get `Jonas`
console.log(passengerCorrect);

// Comparing emails
const email = `hello@jonas.io`;
const loginEmail = `  Hello@Jonas.io \n`;

const lowerEmail = loginEmail.toLowerCase(); //all lowercase
const trimmedEmail = lowerEmail.trim(); //removes whitespace
console.log(trimmedEmail);

const normalizedEmail = loginEmail.toLowerCase().trim(); //since we can chain methods we can do it all in one
console.log(normalizedEmail);

//in a function
const correctEmail = email => email.toLowerCase().trim();
console.log(correctEmail(`        Hello@thisLower.io   `));

//replacing
const replaceThis = `Jackson`; //we will replace the k
const newJack = replaceThis.replace(`k`, `c`);
console.log(newJack);

//we can also chain replace since it is once again a method
const newJack2 = replaceThis.replace('k', 'c').replace(`o`, `0`);
console.log(newJack2);

const announcement = `All passengers come to boarding door 23. Boarding door 23!`;

console.log(announcement.replace(`door`, `gate`)); //will replace the first string door with gate in the string but not all
console.log(announcement.replaceAll(`door`, `gate`)); //replace all instances of door in the string
console.log(announcement.replace(/door/g, `gate`)); //another way to do it using regex

//Booleans
const newPlane = `A320neo`;
console.log(newPlane.includes(`A320`)); //returns true
console.log(newPlane.includes(`Boeing`)); //returns false
console.log(newPlane.startsWith(`Air`)); //returns false
console.log(newPlane.endsWith(`neo`)); //returns true

//Practice exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase(); //this is used all the time
  if (baggage.includes(`knife`) || baggage.includes(`gun`)) {
    console.log(`You are NOT allowed on board`);
  } else {
    console.log(`Welcome aboard!`);
  }
};

checkBaggage(`I have a laptop, some food and a pocket Knife`);
checkBaggage(`Socks and camera`);
checkBaggage(`Got some snacks and a gun for proctection`);

//split and join
console.log(`a+very+nice+string`.split(`+`));
console.log(`Jonas Schmedtamn`.split(` `));
const [firstName, lastName] = `Jonas Schmedtamn`.split(` `); //will take string and break it into two strings attached to those two variables
console.log(firstName, lastName); //test

const newName = [`Mr.`, firstName, lastName.toUpperCase()].join(` `); //join will join an array to create a string join(x) x === what will join the string
console.log(newName);

const capitalizeName = name => {
  const names = name.split(` `);
  const namesUpper = [];
  for (const n of names) {
    namesUpper.push(n[0].toUpperCase() + n.slice(1));
  }
  console.log(namesUpper.join(` `));
};

capitalizeName(`jessica ann smith davis`);
capitalizeName(`jonas schemdtmann`);

const maskCreditCard = function (number) {
  const str = number + ``; //takes number and turns it into a string, anything + a string will convert the output to a string
  const last = str.slice(-4);
  return last.padStart(str.length, `*`);
};

console.log(maskCreditCard(12345671234567));
console.log(maskCreditCard(29321923801312));

//coding challenge 4

// Write a program that receives a list of variable names written in underscore_case
// and convert them to camelCase.
//The input will come from a textarea inserted into the DOM (see code below to
// insert the elements), and conversion will happen when the button is pressed.
// Test data (pasted to textarea, including spaces):
// underscore_case
// first_name
// Some_Variable
// calculate_AGE
// delayed_departure
// Should produce this output (5 separate console.log outputs):
// underscoreCase ✅
// firstName ✅✅
// someVariable ✅✅✅
// calculateAge ✅✅✅✅
// delayedDeparture ✅✅✅✅✅
// Hints:
// § Remember which character defines a new line in the textarea 😉
// § The solution only needs to work for a variable made out of 2 words, like a_b
// § Start without worrying about the ✅. Tackle that only after you have the variable
// name conversion working 😉
// § This challenge is difficult on purpose, so start watching the solution in case
// you're stuck. Then pause and continue!
// Afterwards, test with your own test data!

const toCamelCase = function (str) {
  const lowerStr = str.toLowerCase().split(`_`);
  const secondStr = lowerStr[1].split(``);
  const camelCap = secondStr[0].toUpperCase();
  const camelCap2 = secondStr.join(``);
  const sliceCamel = camelCap2.slice(1);
  const newCamelCap = lowerStr[0] + camelCap + sliceCamel;

  return newCamelCap;
};

console.log(toCamelCase(`underscore_case`));
console.log(toCamelCase(`Some_Variable`));
console.log(toCamelCase(`calculate_AGE`));
console.log(toCamelCase(`delayed_departure`));
console.log(toCamelCase(`first_name`));

// const ordersSet = new Set([
//   `Pasta`,
//   `Pizza`,
//   `Pizza`,
//   `Risotto`,
//   `Pasta`,
//   `Pizza`,
// ]);
// //will only show elements once even if multiple
// console.log(ordersSet);
// //will iterrate over the string jonas and split it
// console.log(new Set(`Jonas`));
// //will give back total amount of unique elements in the set
// console.log(ordersSet.size);

// console.log(ordersSet.has(`Pasta`)); //returns true because it is a element
// console.log(ordersSet.has(`Cat`)); //returns false because it is not an element of set

// //can add elements to a set, we add two here but only 1 is added due to no duplicates in a set
// ordersSet.add(`Garlic Bread`);
// ordersSet.add(`Garlic Bread`);
// console.log(ordersSet);

// ordersSet.delete(`Risotto`); //will delete the element from the set
// console.log(ordersSet);

// //Example
// const staff = [`Waiter`, `Chef`, `Waiter`, `Manager`, `Chef`, `Waiter`];
// const staffUnique = [...new Set(staff)];
// console.log(staffUnique);

//a map is a data structure we can use to map values to keys, like objects values are stored in key value pairs, in maps keys can have any type
// const rest = new Map();
// rest.set(`name`, `Classico Italiano`);
// rest.set(1, `Firenze Italy`);
// rest.set(2, `Lisbon, Portugal`);

// rest
//   .set(`catergories`, [`Italian`, `Pizzeria`, `Vegetarian`, `Organic`])
//   .set(`open`, 11)
//   .set(`close`, 23)
//   .set(true, `we are open :D`)
//   .set(false, `we are closed :()`);
// console.log(rest);

// console.log(rest.get(1));

// Coding Challenge #3
// Let's continue with our football betting app! This time, we have a map called
// 'gameEvents' (see below) with a log of the events that happened during the
// game. The values are the events themselves, and the keys are the minutes in which

// each event happened (a football game has 90 minutes plus some extra time).

// Your tasks:
// 1. Create an array 'events' of the different game events that happened (no duplicates)
// 2. After the game has finished, is was found that the yellow card from minute 64
// was unfair. So remove this event from the game events log.
// 3. Compute and log the following string to the console: "An event happened, on
// average, every 9 minutes" (keep in mind that a game has 90 minutes)
// 4. Loop over 'gameEvents' and log each element to the console, marking
// whether it's in the first half or second half (after 45 min) of the game, like this:
// [FIRST HALF] 17:
// ⚽
// GOAL

// const gameEvents = new Map([
//   [17, '⚽ GOAL'],
//   [36, '🔁 Substitution'],
//   [47, '⚽ GOAL'],
//   [61, '🔁 Substitution'],
//   [64, '🔶 Yellow card'],
//   [69, '🔴 Red card'],
//   [70, '🔁 Substitution'],
//   [72, '🔁 Substitution'],
//   [76, '⚽ GOAL'],
//   [80, '⚽ GOAL'],
//   [92, '🔶 Yellow card'],
// ]);

// const events = [new Set(gameEvents)];
// console.log(events);

//WITH optional chaining
// console.log(restaurant.openingHours?.mon?.open);
// const days = [`mon`, `tue`, `wed`, `thu`, `fri`, `sat`, `sun`];
// for (const day of days) {
//   // console.log(day);
//   const open = restaurant.openingHours[day]?.open || 1;
//   console.log(`On ${day}, we open at ${open}`);
// }

// //Methods
// console.log(restaurant.order?.(0, 1) ?? `Method does not exist`);
// console.log(restaurant.orderRisotto?.(0, 1) ?? `Method does not exist`);

// //Arrays
// const users = [{ name: `Jonas`, email: `hello@jonas.io` }];
// console.log(users[0]?.name ?? `user array empty`);

// for (const properties of Object.keys(openingHours)) {
//   console.log(properties);
// }

// for (const values of Object.values(openingHours)) {
//   console.log(values);
// }
// const values = Object.values(openingHours);

// const entries = Object.entries(openingHours);

// // for (const day of Object.entries(openingHours)) {
// //   // console.log(day);
// // }

// for (const [key, { open, close }] of entries) {
//   console.log(`on ${key} we open at ${open} and close at ${close}`);
// }

// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// //for-of loop
// //for (declareVar variableName of object)
// for (const item of menu) console.log(item);

// for (const [i, el] of menu.entries()) {
//   console.log([`${i + 1}: ${el}`]);
// }

/*
We're building a football betting app (soccer for my American friends 😅)!
Suppose we get data from a web service about a certain game ('game' variable on
next page). In this challenge we're gonna work with that data.

Your tasks:
1. Create one player array for each team (variables 'players1' and
'players2')

2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the
goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10
field players
3. Create an array 'allPlayers' containing all players of both teams (22
players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus
'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called
'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player
names (not an array) and prints each of them to the console, along with the
number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which
team is more likely to win, without using an if/else statement or the ternary
operator.
Test data for 6.: First, use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'.
Then, call the function again with players from game.scored
*/

// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };

//Challenge 2
//------------------------------------
// Let's continue with our football betting app! Keep using the 'game' variable from before.
// Your tasks:

// 1. Loop over the game.scored array and print each player name to the console,
// along with the goal number (Example: "Goal 1: Lewandowski")

// 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)

// 3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
// Odd of victory Bayern Munich: 1.33
// Odd of draw: 3.25
// Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them
// (except for "draw"). Hint: Note how the odds and the game objects have the
// same property names 😉

// 4. Bonus: Create an object called 'scorers' which contains the names of the
// players who scored as properties, and the number of goals as the value. In this game, it will look like this:
// {
// Gnarby: 1,
// Hummels: 1,
// Lewandowski: 2
// }

//1

// const scoredEntries = Object.entries(game.scored);

// for (const [i, el] of scoredEntries) {
//   console.log(`Goal ${Number(i) + 1}: ${el}`);
// }

// 2
// const oddValues = Object.values(game.odds);
// let average = 0;
// for (const x of oddValues) average += x;
// average /= oddValues.length;
// console.log(average);

//3
// for (const [team, odd] of Object.entries(game.odds)) {
//   const teamStr = team === 'x' ? `draw` : `victory ${game[team]}`;
//   console.log(`Odd of ${teamStr} ${odd}`);
// }

//4

//Challenge 1
//------------------------------------
// //1.
// const [players1, players2] = game.players;
// console.log(players1, players2);

// //2.
// const [gk, ...fieldPlayers] = players1;
// console.log(gk, fieldPlayers);

// //3.
// const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

// //4.
// const players1Final = ['Thiago', 'Coutinho', 'Perisic', ...players1];
// console.log(players1Final);

// //5.
// const {
//   odds: { team1, x: draw, team2 },
// } = game;
// // const { team1, draw: x, team2 } = game.odds;
// console.log(team1, draw, team2);

// //6.
// const printGoals = function (...players) {
//   console.log(`${players.length} goals were scored`);
// };

// // printGoals('Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels');
// printGoals(...game.scored);

// //7.
// team1 < team2 && console.log(`Team 1 is more likely to win`);
// team2 < team1 && console.log(`Team 2 is more likely to win`);

// const rest1 = {
//   name: `Capri`,
//   numGuests: 0,
// };

// const rest2 = {
//   name: `La Piazza`,
//   owner: `Giovanni Rossi`,
// };

// // rest1.numGuests = rest1.numGuests || 10;
// // rest2.numGuests = rest2.numGuests || 10;

// //OR assignment operator
// rest1.numGuests ||= 10; //same as line 61
// rest2.numGuests ||= 10; //same as line 62
// //nullish assignment operator (null or undefined)
// rest1.numGuests ??= 10; //same as line 61
// rest2.numGuests ??= 10; //same as line 62

// // rest1.owner = rest1.owner && `<ANNOYMOUS`;
// // rest2.owner = rest2.owner && `<ANNOYMOUS`;
// rest1.owner &&= `<ANNOYMOUS>`;
// rest2.owner &&= `<ANNOYMOUS>`;

// console.log(rest1);
// console.log(rest2);

// restaurant.numGuests = 0;
// const guest = restaurant.numGuests || 10;
// console.log(guest);

// //Nullish Coalescing Operator: null and undefined (NOT 0 or ``);
// //introduced in JavaScript 2020
// const guestCorrect = restaurant.numGuests ?? 10;
// console.log(guestCorrect);

// //OR operator and short-circuiting
// console.log(`------OR--------`);
// //Use ANY data type, return ANY data type, short-circuiting
// console.log(3 || `Jonas`);
// //short-circuiting means if the first value is a truthy value it will immediately return that first value, so that's why we get 3 here
// console.log(`` || 'Jonas');
// //since `` is a falsey value, `Jonas` will be returned here since it is a truthy value
// console.log(true || 0);
// //true is a truthy so it is taken in right away
// console.log(undefined || null);
// //undefined and null are both falsey values, but null will be returned
// console.log(undefined || 0 || `` || `Hello` || 23 || null); //we will skip the first 3 values in this log because they are all falsey values. `Hello` will print to the console being a true value.
// restaurant.numGuests = 23;
// const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guests1);
// //short-circuiting with || operator
// const guest2 = restaurant.numGuests || 10;
// console.log(guest2);
// //AND operator and short-circuting
// //AND works exactly the same way but the opposite to OR
// console.log(`--------AND--------`);
// console.log(0 && `Jonas`);
// //will return the falsey value first
// console.log(7 && `Jonas`);
// //will return Jonas as 7 is true and so is Jonas has no false value so will return last true value in the expression
// console.log(`Hello` && 23 && null && `jonas`);
// //skips all truthy values and returns our falsey null

// //Practical example
// if (restaurant.orderPizza) {
//   restaurant.orderPizza(`mushrooms`, `spinach`);
// }
// //same as above
// restaurant.orderPizza && restaurant.orderPizza(`mushrooms`, `spinach`);

/*
//--------------------------------------------------------------------------
//destructuring

//Rest is to pack elements into an array, it is the opposite of the Spread Operator
//REST, because on the LEFT side of = `equal sign`
const [a, b, ...others] = [1, 2, 3, 4, 5];
//the rest of the elements will become an array named others
console.log(a, b, others);
//rest element must always be the last element
const [pizza, , risotto, ...otherFoods] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFoods);

//Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);
*/
//--------------------------------------------------------------------------
/*
//2) functions
//rest parameters
const add = function (...numbers) {
  // console.log(numbers);
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
};
console.log(add(2, 5, 6, 7));
console.log(add(2, 3));
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const x = [23, 5, 7];
console.log(add(...x));
//using rest arguments with method
restaurant.orderPizza(`mushrooms`, `onion`, `olivers`, `spinach`);

// restaurant.orderDelievery({
//   time: `22:30` = `22:00`,
//   address: `Via del Sole, 21`,
//   // mainIndex: 2 = 0,
//   startIndex: 2 = 1,
// });

/*
----------------------------------------------------------------------------
//delcare array
const arr = [7, 8, 9];
//want to create new array but add items from arr, this is how we would do it pre-ES6
const badArr = [1, 2, arr[0], arr[1], arr[2]];
//now with ES6 but using the Spread Operator(...)
const newArr = [1, 2, ...arr];
console.log(badArr);
console.log(newArr);
//can use Spread Operator to log individual element
console.log(...arr);
//works with strings as well
const newMenu = [...restaurant.mainMenu, `Gnocci`];
console.log(newMenu);
//we can only use the Spread Operator where we would have values that are separated by commas

//copy array (shallow copy)
const mainMenuCopy = [...restaurant.mainMenu];

//Join 2 arrays using the Spread Operator
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

//Iterables: arrays, strings, maps, sets. NOT objects
const str = `Jonas`;
//using the spread operator on the string and expand it into characters
const letters = [...str];
console.log(letters);

// //Real world example
// const ingredients = [
//   //prompt will take user input and give back
//   prompt(`Let's make pasta! Ingredient 1`),
//   prompt(`Let's make pasta! Ingredient 2`),
//   prompt(`Let's make pasta! Ingredient 3`),
// ];
// console.log(ingredients);
// //use the Spread Operator to fill arguments of orderPasta function
// restaurant.orderPasta(...ingredients);

// Objects
//copying an Object using the Spread Operator
const newRestaurant = { ...restaurant, founder: `Guiseppe` };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = `Ristorante Roma`;
//we create a new copy of the restaurant object, then we change the name of the new object
console.log(restaurantCopy.name, restaurant.name);
----------------------------------------------------------------------------
*/

/*
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

const { name: newName, openingHours: hours, categories: tags } = restaurant;
console.log(newName, hours, tags);

//default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

//mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj);
console.log(a, b);

//nested objects
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);
*/
/*
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

//this is the same as above (array destructuring)
const [x, y, z] = arr;
console.log(a, b, c);
console.log(x, y, z);
//array is not effected when destructing
console.log(arr);
//to get a number higher in the array we just leave a space in between the destructing example if we wanted [0 & 2] from categories we would use
// const [first, , second] = restaurant.categories
let [main, secondary] = restaurant.categories;
console.log(main, secondary);

//Switching variables
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

[main, secondary] = [secondary, main];
console.log(main, secondary);

//recieve 2 return values from a function
console.log(restaurant.order(2, 0));
const [starter, mainItem] = restaurant.order(2, 0);
console.log(starter, mainItem);

const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);

//Nested destructuring
const [i, , [j, k]] = nested;
console.log(i, j, k);

//Default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);
*/
