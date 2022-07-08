'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return `Today`;
  if (daysPassed === 1) return `Yesterday`;
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  const day = `${date.getDate()}`.padStart(2, '0');
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date);

    const calcDaysPassed = (date1, date2) =>
      Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

//FAKE ALWAYS LOGGED IN
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //Dispaly current date and time
    const now = new Date();
    const day = `${now.getDate()}`.padStart(2, '0'); //padStart(final length, value to be added)
    const month = `${now.getMonth() + 1}`.padStart(2, '0'); //same as above
    const year = now.getFullYear();
    const hour = `${now.getHours()}`.padStart(2, '0');
    const minutes = `${now.getMinutes()}`.padStart(2, '0');
    labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minutes}`;
    //day/month/year

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    //add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(acc.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
//conversion
console.log(Number('23'));
console.log(+'23'); //this is the same as above

//parsing
//Number.parseInt(string, radix?-the base we are using)
console.log(Number.parseInt('30px', 10)); //this will find the number within the string, string must start with a number 'e23' would not work

console.log(Number.parseFloat('2.5rem')); //will return decimal from string
console.log(Number.parseInt('2.5rem')); //will remove decimal
//should use parse when checking if a string is a number value

console.log(Number.isNaN(23)); //returns false, as it's a int
console.log(Number.isNaN('23')); //returns false as well, as it is a number
//Check if value is NaN

console.log(Number.isFinite(20)); //return true as it's fintie
console.log(Number.isFinite(20 / 0)); //true as this is Infinty
console.log(20 / 0);
//should use isFinite to check if value is a number

console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));

//square root
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2)); //same as above
console.log(8 ** (1 / 3));

console.log(Math.max(5, 18, 23, 11, 2)); //returns 23, the highest value
console.log(Math.max(5, 18, '23', 11, 2)); //returns 23, the highest value
console.log(Math.max(5, 18, '23px', 11, 2)); //returns NaN, as the highest value is NaN

console.log(Math.min(5, 18, 23, 11, 2)); //returns 2, the lowest value
console.log(Math.min(5, 18, 23, 11, '2')); //returns 2, the lowest value

console.log(Math.PI); //returns 3.1415...
console.log(Math.PI * Number.parseFloat(`10px`) ** 2);

console.log(Math.trunc(Math.random() * 6) + 1); //random dice rolls

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
//this will always give us a random number between max - min values specified
// Math.random returns 0...1 0...(max - min)
console.log(randomInt(10, 20));

//rounding integers
console.log(Math.trunc(23.3)); //removes decimals

console.log(Math.round(23.9)); //rounds to nearest int
console.log(Math.round(23.3));

console.log(Math.ceil(24.5)); //always rounds up
console.log(Math.ceil(24.2));

console.log(Math.floor(24.7)); //always round down
console.log(Math.floor(24.2));

console.log(Math.trunc(-23.3));
console.log(Math.floor(-23.3)); //with negative numbers floor will take -23 and round it to -24 as it works the other way around returning to the floor -> 0

//rounding decimal(floating point)
console.log((2.7).toFixed(0)); //toFixed(floating point amount), as a string
console.log((2.7).toFixed(3)); //returns 2.700 as we specified to 3 decimal places
console.log((2.345).toFixed(1)); //returns 2.3
console.log(+(2.345).toFixed(1)); //placing a + at the start will return a num value

//numeric seperators
const diameter = 287_460_000_000;
console.log(diameter); //will ignore the numeric seperators

const priceCents = 345_99;
console.log(priceCents);

const transferFee1 = 15_00; //numeric seperators give the idea of different meanings to numbers 15.00 here
const transferFee2 = 1_500; //1,500 here

// const PI = 3._1415;
// const PI = _3.1415;
// const PI = 3_.1415;
// console.log(PI) all 3 of the above will throw an error on placement of numeric seperator

console.log(Number('23_000')); //using numeric seperators in strings that you are trying to convert will throw a NaN
console.log(parseInt('230_000')); //this will return 230, leaving off the other 3 000.

console.log(2 ** 53 - 1); //biggest int value for JavaScript
console.log(Number.MAX_SAFE_INTEGER); //same as above

console.log(2402323192309123912930123n); //transforms number into a bigInt num
console.log(BigInt(2402323192309123912930123));

//operations with BigInt
console.log(10000n + 10000n);
console.log(10000n * 100000n);
console.log(10000n * 103231231232313231230000n); //BigInt cannot be mixed with regular int

console.log(20n > 15); // > & < will work with BigInt and normal int
console.log(20n === 20); //strict equality will return false as these are two different primitives
console.log(20n == 20); //will be true

//create a date
const now = new Date(); //get current date and time now
console.log(now);

console.log(new Date(`Jul 08 2022 15:00:58`));
console.log(new Date(`December 24, 2015`)); //not usually a good idea

console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 10, 19, 15, 23, 5));
// Thu Nov 19 2037 15:23:05 GMT+1100 (Australian Eastern Daylight Time)
//new Date(year, month(0 based), day, hour, min, sec)
console.log(new Date(1995, 0, 6, 10, 50, 55));

console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000));

//working with dates

const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear()); //returns the year
console.log(future.getMonth()); //returns month - 0 based
console.log(future.getDate()); //returns day
console.log(future.getDay()); //returns day as in int value but day represents mon = 1, tues = 2...
console.log(future.getMinutes()); //returns minutes
console.log(future.getHours()); //returns hours
console.log(future.getSeconds()); //returns seconds
console.log(future.toISOString()); //returns the ISOString which is a string you can store
console.log(future.getTime()); //returns the timestamp
console.log(new Date(2142217380000)); //using the timestamp we can return the date associated with that timestamp
console.log(Date.now()); //returns timestamp right now

future.setFullYear(2040); //setter
console.log(future);

const future = new Date(2037, 10, 19, 15, 23);
console.log(+future);

const calcDaysPassed = (date1, date2) => date2 - date1;
console.log(calcDaysPassed(new Date(2022, 10, 24), new Date(2022, 10, 27)));
console.log(new Date(259200000));

*/
