'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const account5 = {
  owner: 'Emma Bub',
  movements: [1000, 1000, 3000, -1000, 50, 90, 10000, -2000, -300, -500, 1000],
  interestRate: 1,
  pin: 5555,
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//movements by account
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? `deposit` : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// 'Steven Thomas Williams', username
const user = 'Steven Thomas Williams'; //stw

//had to use a forEach loop to loop over each to create a new object within the accounts object, if we would of used Math we would only create a new array
//how usernames are created
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(` `)
      .map(val => val[0])
      .join(``);
  });

  // const username = user
  //   .toLowerCase()
  //   .split(' ')
  //   .map(val => val[0])
  //   .join('');
  // return username;
};

//function created the usernames
createUsernames(accounts);

//total current balance displayed top right under login
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = `(☞ﾟヮﾟ)☞ $${acc.balance}`;
};

//values display at the bottom of app, in, out and interest
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `$${interest}`;
  labelSumOut.textContent = `$${out}`;
  labelSumIn.textContent = `$${incomes}`;
};

const updateUI = function (acc) {
  //display movements
  displayMovements(acc.movements);

  //display balance
  calcDisplayBalance(acc);

  //display summary
  calcDisplaySummary(acc);
};

//Event handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); //prevents form from submitting by default

  //.value() is making sure values are correct to object
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  //optional chaining '?'
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //display ui and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(` `)[0] //split(' ')[0] will take the first name of our currentAccount and display it with the welcome message
    }`;

    //clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //creates the fade of login
    containerApp.style.opacity = 100;

    //update UI
    updateUI(currentAccount);
  }
});

//transer money
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault(); //common to do when working with forms

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  //clears fields
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});

// console.log(containerMovements.innerHTML);

//request a loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //add movement
    currentAccount.movements.push(amount);
    //update ui
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
});

//close account
btnClose.addEventListener('click', function (e) {
  e.preventDefault(); //prevents default

  if (
    currentAccount.username === inputCloseUsername.value &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    console.log(`true`);

    const index = accounts.findIndex(
      //findIndex(val) will return the first element that meets specified condition
      acc => acc.username === currentAccount.username
    );

    //delete account
    accounts.splice(index, 1);

    //hide UI
    containerApp.style.opacity = 0;
  }

  //clears fields
  inputCloseUsername.value = inputClosePin.value = '';
});

//sorting function
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let arr = ['a', 'b', 'c', 'd', 'e'];

// //slice() does not mutate original array
// console.log(arr.slice(2));
// console.log(arr.slice(-1));
// console.log(arr.slice(2, 3));

// console.log([...arr]); //spread op is the same as slice below
// console.log(arr.slice());

// //splice() will mutate original array (deletes contents)
// arr.splice(-1); //most common use case to remove end of an array
// console.log(arr);

// //reverse() will mutate array
// const arr2 = ['k', 'i', 'h', 'g', 'j'];
// console.log(arr2);
// console.log(arr2.reverse()); //reverse will mutate the original array
// console.log(arr2);

// //concat() used to concat 2 arrays doees not mutate array
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]); //same as concat

// //join()
// console.log(letters.join(` - `));

// const arr = [23, 11, 64];

// //at()
// console.log(arr[0]);
// console.log(arr.at(0)); //same as above

// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]);
// console.log(arr.at(-1)); //same as both above
// // console.log(arr.at(-1)); //more up to date way at() also works on strings

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${movement}`);
//   } else console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
// }

// console.log(`----------FOREACH------------`);
// //same as above but using a forEach loop
// //we should use forEach more

// movements.forEach(function (mov, i, arr) {
//   //forEach(callBackFN)(var, index, arr)
//   if (mov > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${mov}`);
//   } else console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
// });
// //forEach will ALWAYS loop over the entire array

// const currencies = new Map([
//   //key: value
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// //map
// // currencies.forEach(function (value, key, map)
// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

// //using set, sets don't have keys or indexs
// const currenciesUnquie = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnquie);
// currenciesUnquie.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

/*
Working With Arrays

Coding Challenge #1

Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Your tasks:
Create a function 'checkDogs', which accepts 2 arrays of dog's ages
('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the first and the last two dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function
parameters)

2. Create an array with both Julia's (corrected) and Kate's data

3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶 ")

4. Run the function for both test datasets

Test data:
§ Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
§ Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
Hints: Use tools from all lectures in this section so far 😉
GOOD LUCK 😀
*/

// function checkDogs(dogsJulia, dogsKate) {
//   const newJulia = dogsJulia.slice(1, 3);
//   const correctData = newJulia.concat(dogsKate);
//   correctData.forEach(function (val, i) {
//     if (val >= 3) {
//       console.log(`Dog number ${i + 1} is an adult, and is ${val} years old`);
//     } else console.log(`Dog number ${i + 1} is still a puppy 🐕`);
//   });
// }

// console.log(`1st`);
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// console.log(`2nd`);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const euroToUsd = 1.1;

// // const movementsUSD = movements.map(function (mov) {
// //   return Math.trunc(mov * euroToUsd);
// // });

// //arrow function of above map
// const movementsUSD = movements.map(mov => Math.trunc(mov * euroToUsd));

// const movementsTest = movements.map(function (val, i) {
//   console.log(val, i);
//   return val * (i + 1);
// });

// const movementsUSDfor = [];
// for (const mov of movements) movementsUSDfor.push(Math.trunc(mov * euroToUsd)); //Math.trunc() removes the decimal points

// const movementsDescription = movements.map(
//   (mov, i) =>
//     `Movement ${i + 1}: You ${mov > 0 ? `deposited` : `withdrew`} ${Math.abs(
//       mov
//     )}`
// );

// console.log(`original`);
// console.log(movements);

// console.log(`for loop`);
// console.log(movementsUSDfor);

// console.log(`math`);
// console.log(movementsUSD);

// console.log(`another math * index`);
// console.log(movementsTest);

// console.log(`math, arrow using (mov, i, arr)`);
// console.log(movementsDescription);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // arr.filter(function(val, i, arr))
// const deposits = movements.filter(function (mov) {
//   return mov > 0; //use a boolean
// });

// //arrow filter function
// const deposits2 = movements.filter(mov => mov > 0);

// const withdrawals = movements.filter(mov => mov < 0);

// console.log(`original arr`);
// console.log(movements);
// console.log(`normal filter function`);
// console.log(deposits);
// console.log(`arrow filter function (deposit)`);
// console.log(deposits2);
// console.log(`arrow filter function (withdrawal)`);
// console.log(withdrawals);

// //arr.reduce(function(accumulator, i, arr))
// //accumulator is like a SNOWBALL
// const totalBalance = movements.reduce(function (acc, val, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return (acc += val);
// }, 0);

// //arrow function of reduce
// const arrowTotal = movements.reduce((acc, val) => (acc += val));

// console.log(totalBalance);
// console.log(arrowTotal);

/*
Coding Challenge #2
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Your tasks:

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
humanAge = 16 + dogAge * 4

2. Exclude all dogs that are less than 18 human years old (which is the same as
keeping dogs that are at least 18 years old)

3. Calculate the average human age of all adult dogs (you should already know
from other challenges how we calculate averages 😉)

4. Run the function for both test datasets

Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK 😀
*/

// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(val => (val <= 2 ? val * 2 : 16 + val * 4));

//   const adults = humanAges.filter(val => val >= 18);

//   // const average = adults.reduce(function (acc, val, i, arr) {
//   //   return Math.trunc(acc + val / arr.length, 0);
//   // });

//   //the return in my function must of influenced the return outside?
//   const average = adults.reduce(
//     (acc, val, i, arr) => Math.trunc(acc + val / arr.length),
//     0
//   );

//   return average;
// };

//coding challenge 3
// const calcAverageHumanAge = ages =>
//   ages
//     .map(val => (val <= 2 ? val * 2 : 16 + val * 4))
//     .filter(val => val >= 18)
//     .reduce((acc, val, i, arr) => acc + val / arr.length, 0);

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const euroToUsd = 1.1;
// //chaining methods, we can only chain when the method returns an array
// //PIPELINE
// const totalDepositsInUSD = movements
//   .filter(mov => mov > 0)
//   // .map(mov => mov * euroToUsd)
//   .map((mov, i, arr) => {
//     //using the all the parameters avaiable we can check in the middle of our pipline that our values are correct using arr
//     console.log(arr);
//     return mov * euroToUsd;
//   })
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(totalDepositsInUSD);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const firstWithdrawal = movements.find(mov => mov < 0); //need a boolean result, find will return first element in the array that meets the boolean condition

// console.log(movements);
// console.log(firstWithdrawal);

// console.log(accounts);

// const account = accounts.find(acc => acc === 'Jessica Davis');
// console.log(account);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// console.log(movements);
// //arr.includes() method will test to see if a certain value is in the array, will throw a boolean value - it is strict checking for equality
// console.log(movements.includes(-130));
// console.log(movements.some(mov => mov === -130)); //same as above

// //arr.some() checks for a condition and returns a boolean
// const anyDeposits = movements.some(mov => mov > 0);
// console.log(anyDeposits);

// //will check coniditon and throw back a boolean value, all elements in the array will be tested against the condition
// console.log(movements.every(mov => mov > 0));

// //separate callback
// const deposit = mov => mov > 0;
// //using a variable as a callback
// console.log(movements.every(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));

// const arr = [[1, 2, 3], [4, 5, 6], 7, 8, [8, 7]];

// //will take a nested array and return all elements in one array
// console.log(arr.flat());

// const arrDeep = [[1, 2, [3], [2, 3]], 1, 2];
// //arr.flat(depth) depth here will go as deep into the nest you wish, by default it is 1
// console.log(arrDeep.flat(2));

// // const accountMovements = accounts.map(acc => acc.movements);
// // console.log(accountMovements);
// // const allMovements = accountMovements.flat();
// // console.log(allMovements);
// // const overallBalance = allMovements.reduce((acc, val) => acc + val);
// // console.log(overallBalance);

// //flat()
// const overallBalance = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, val) => acc + val); //this is the above but arrow function short hand

// //flatMap() - can only go 1 nested array deep by default
// const overallBalanceFlatMap = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, val) => acc + val);

// console.log(overallBalance);
// console.log(overallBalanceFlatMap);

// //sorting strings
// const owners = ['jonas', 'zach', 'adam', 'martha'];
// console.log(owners.sort()); //mutates the array
// console.log(owners);

// //sort() sorts as strings
// console.log(movements);

// //return < 0, a, b (keep order)
// //return > 0 b, a (switch order)
// //how to sort in accending order
// // const ascendingOrder = movements.sort((a, b) => {
// //   if (a > b) return 1;
// //   if (b > a) return -1;
// // });

// const ascendingOrder = movements.sort((a, b) => a - b); //simplified of above
// console.log(`ascending`);
// console.log(ascendingOrder);

// // const descendingOrder = movements.sort((a, b) => {
// //   if (a > b) return -1;
// //   if (b > a) return 1;
// // });
// const descendingOrder = movements.sort((a, b) => b - a); //simplified of above

// console.log(`descending`);
// console.log(descendingOrder);

// const y = new Array(1, 2, 3, 4, 5, 6);
// console.log(y);

// //when we pass in one arg, it creates a array length of 7
// const x = new Array(7);
// console.log(x);
// // x.fill(1); //fill will mutate the array and fill it with the element specified
// x.fill(1, 3, 5); //fill(el, start, end)
// console.log(x);

// y.fill(23, 4, 6);
// console.log(y);

// //array.from
// const z = Array.from({ length: 7 }, () => 1);
// console.log(z);

// const a = Array.from({ length: 7 }, (_, i) => i + 1);
// console.log(a);

// const randomDice = Array.from({ length: 100 }, roll => {
//   roll = Math.ceil(Math.random() * 6);
//   return roll;
// });
// console.log(randomDice);

// // const randomDice = Array.from({ length: 100 }, _ => Math.ceil(Math.random) * 6);

// // console.log(randomDice);

// const movementsUI = Array.from(document.querySelectorAll('.movements__value'));
// console.log(movementsUI);

// const bankDepositSum = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov > 0)
//   .reduce((acc, mov) => acc + mov);
// console.log(bankDepositSum);

// // const numDeposits1000 = accounts
// //   .flatMap(acc => acc.movements)
// //   .filter(mov => mov >= 1000).length;

// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((count, val) => (val >= 1000 ? ++count : count), 0);

// console.log(numDeposits1000);

// //using reduce to put values in a object, then destructuring them
// const { deposits, withdrawals } = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (acc, val) => {
//       // val > 0 ? (acc.deposits += val) : (acc.withdrawals += val);
//       acc[val > 0 ? 'deposits' : 'withdrawals'] += val; //other way to do it not using . notation
//       return acc;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );

// console.log(deposits, withdrawals);

// const convertTitleCase = function (title) {
//   const capitalize = str => str[0].toUpperCase() + str.slice(1);

//   const exceptions = ['a', 'an', 'the', 'but', 'and', 'or', 'on', 'in', 'with'];

//   const titleCase = title
//     .toLowerCase()
//     .split(' ')
//     .map(word => (exceptions.includes(word) ? word : capitalize(word)))
//     .join(` `);

//   return capitalize(titleCase);
// };

// console.log(convertTitleCase(`this is a nice title`));
// console.log(convertTitleCase(`this is a LONG title but not too long`));
// console.log(convertTitleCase(`and here is another title with an EXAMPLE`));

/*
Coding Challenge #4
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.

Eating too much means the dog's current food portion is larger than the
recommended portion, and eating too little is the opposite. Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

Your tasks:

1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do not create a new array, simply loop over the array. Forumla:
recommendedFood = weight ** 0.75 * 28. (The result is in grams of
food, and the weight needs to be in kg)

2. Find Sarah's dog and log to the console whether it's eating too much or too
little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
the owners array, and so this one is a bit tricky (on purpose) 🤓

3. Create an array containing all owners of dogs who eat too much
('ownersEatTooMuch') and an array with all owners of dogs who eat too little
('ownersEatTooLittle').

4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"

5. Log to the console whether there is any dog eating exactly the amount of food
that is recommended (just true or false)

6. Log to the console whether there is any dog eating an okay amount of food
(just true or false)

7. Create an array containing the dogs that are eating an okay amount of food (try to reuse the condition used in 6.)

8. Create a shallow copy of the 'dogs' array and sort it by recommended food
portion in an ascending order (keep in mind that the portions are inside the
array's objects 😉)

Hints:
§ Use many different tools to solve these challenges, you can use the summary
lecture to choose between them 😉
§ Being within a range 10% above and below the recommended portion means:
current > (recommended * 0.90) && current < (recommended *
1.10). Basically, the current portion should be between 90% and 110% of the
recommended portion.

Test data:

const dogs = [
{ weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
{ weight: 8, curFood: 200, owners: ['Matilda'] },
{ weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
{ weight: 32, curFood: 340, owners: ['Michael'] },
];
GOOD LUCK 😀

*/

// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] },
// ];

// //1
// dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));

// //2
// const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
// console.log(
//   `Sarah's dog is eating ${
//     dogSarah.curFood > dogSarah.recFood ? `too much` : `too little`
//   }`
// );

// //3
// const ownersEatTooLittle = dogs
//   .filter(val => val.curFood < val.recFood)
//   .flatMap(val => val.owners);

// const ownersEatTooMuch = dogs
//   .filter(val => val.curFood > val.recFood)
//   .flatMap(val => val.owners);

// console.log(ownersEatTooMuch);
// console.log(ownersEatTooLittle);

// //4
// /*
// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
// */
// console.log(`too little`);
// ownersEatTooLittle.forEach(person => {
//   console.log(`${person} dog is eating too little`);
// });

// console.log(`too much`);
// ownersEatTooMuch.forEach(person => {
//   console.log(`${person} dog is eating too much`);
// });

// console.log(`${ownersEatTooMuch.join(` and `)} dogs eat too much!`);
// console.log(`${ownersEatTooLittle.join(` and `)} dogs eat too little!`);

// //5
// // 5. Log to the console whether there is any dog eating exactly the amount of food that is recommended (just true or false) Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

// //...

// //6
// const checkEatingOkay = val =>
//   val.curFood > val.recFood * 0.9 && val.curFood < val.recFood * 1.1;

// console.log(dogs.some(checkEatingOkay));

// //7
// console.log(dogs.filter(checkEatingOkay));

// //8
// const dogsCopy = dogs.slice().sort((a, b) => a.recFood - b.recFood);

// console.log(dogsCopy);

/*
Coding Challenge #1
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Your tasks:
Create a function 'checkDogs', which accepts 2 arrays of dog's ages
('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the first and the last two dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function
parameters)

2. Create an array with both Julia's (corrected) and Kate's data

3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶 ")

4. Run the function for both test datasets

Test data:
§ Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
§ Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
Hints: Use tools from all lectures in this section so far 😉
GOOD LUCK 😀
*/

const checkDogs = function (dogsJulia, dogsKate) {
  dogsJulia.splice(0, 1);
  dogsJulia.splice(-2, 2);
  console.log(dogsJulia);

  const together = dogsJulia.concat(dogsKate);
  console.log(together);

  together.forEach((age, i) =>
    age >= 3
      ? console.log(`Dog number ${i + 1} is an adult, and is ${age} years old`)
      : console.log(`Dog number ${i + 1} is still a puppy 🐶`)
  );
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

/*
Coding Challenge #2
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Your tasks:

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
humanAge = 16 + dogAge * 4

2. Exclude all dogs that are less than 18 human years old (which is the same as
keeping dogs that are at least 18 years old)

3. Calculate the average human age of all adult dogs (you should already know
from other challenges how we calculate averages 😉)

4. Run the function for both test datasets
Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK 😀
*/

const calcAverageHumanAge = function (dogAges) {
  // const humanYears = dogAges.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  // console.log(humanYears);

  // const under18 = humanYears.filter(age => age >= 18);
  // console.log(under18);

  // const average = under18.reduce(
  //   (total, age, i, arr) => total + age / arr.length,
  //   0
  // );

  const average = dogAges
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((total, age, i, arr) => total + age / arr.length, 0);

  console.log(average);
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

/*

Your tasks:
1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do not create a new array, simply loop over the array. Forumla:
recommendedFood = weight ** 0.75 * 28. (The result is in grams of
food, and the weight needs to be in kg)

2. Find Sarah's dog and log to the console whether it's eating too much or too
little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
the owners array, and so this one is a bit tricky (on purpose) 🤓

3. Create an array containing all owners of dogs who eat too much
('ownersEatTooMuch') and an array with all owners of dogs who eat too little
('ownersEatTooLittle').

4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"

5. Log to the console whether there is any dog eating exactly the amount of food
that is recommended (just true or false)

6. Log to the console whether there is any dog eating an okay amount of food
(just true or false)

7. Create an array containing the dogs that are eating an okay amount of food (try to reuse the condition used in 6.)

8. Create a shallow copy of the 'dogs' array and sort it by recommended food
portion in an ascending order (keep in mind that the portions are inside the
array's objects 😉)

Hints:
§ Use many different tools to solve these challenges, you can use the summary
lecture to choose between them 😉
§ Being within a range 10% above and below the recommended portion means:
current > (recommended * 0.90) && current < (recommended *
1.10). Basically, the current portion should be between 90% and 110% of the
recommended portion.
GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// //1
// dogs.forEach(dog => {
//   return (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28));
// });

// //2
// const findDog = dogs.find(dog => dog.owners).inlcudes('Sarah');
// console.log(findDog);

// // const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
// // console.log(
// //   `Sarah's dog is eating ${
// //     dogSarah.curFood > dogSarah.recFood ? `too much` : `too little`
// //   }`
// // );
