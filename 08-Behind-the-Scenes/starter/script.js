'use strict';
/*
function calAge(birthYear) {
  const age = 2037 - birthYear;
  //   console.log(firstName); //through scope chain firstName variable will be made avaiable in this function scope; due to it been in gobal scope through a variable lookup and indeed it did.
  function printAge() {
    const output = `${firstName} is ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true; //old pre ES6 variable
      const firstName = 'Kyle';
      const str = `Oh, and you're a millenial, ${firstName}`; //firstName here will be Kyle due to scoping as they are definded in different scopes.
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }
    // console.log(str); - would be able to read this due to it been if block scoped
    console.log(millenial); // millenial variable will be found due to using var type, var types are defaulted to function scope not if block scope.

    // console.log(add(2, 3)); wont be able to be called
  }
  printAge();

  return age;
}

const firstName = 'Jonas';
calAge(1991);
//due to these two been out of the gobal scope and been apart of the function scope for calAge we don't have access to these variables in gobal scope.
// console.log(age);
// printAge();
*/
/*
console.log(this); //this will point to window

const calAge = function (birthYear) {
  console.log(2037 - birthYear);
  //   console.log(this); //in this function declartion it will get it's own scope
};
calAge(1991);

const calAgeArrow = birthYear => {
  console.log(2037 - birthYear);
  //   console.log(this); //this will point to window in gobal scope as well
};
calAgeArrow(1981);

const jonas = {
  year: 1991,
  calAge: function () {
    console.log(this);
    console.log(2037 - this.year); //even though we define the function within jonas through method borroing and the this keyword, we borrow the function from jonas then call it on matilda, the reason we can do that is because of the this keyword, pointing to matilda when it is borrowed through method borrowing.
  },
};

jonas.calAge();

const matilda = {
  year: 2017,
};

matilda.calAge = jonas.calAge; //method borrowing
matilda.calAge();

const f = jonas.calAge;
*/

// const jonas = {
//   firstName: 'Jonas',
//   year: 1991,
//   calAge: function () {
//     console.log(this);
//     console.log(2037 - this.year);

//     const isMillenial = function () {
//       console.log(this.year >= 1981 && this.year <= 1996);
//     };
//     isMillenial();
//   },

//   greet: () => console.log(`Hey ${this.firstName}`), //arrow functions don't get their own scope
// };
// jonas.greet();
// jonas.calAge();

// let age = 30;
// let oldAge = age;
// age = 31;
// console.log(age, oldAge);
// console.log(typeof age);
// console.log(typeof oldAge);

// const me = {
//   name: `Jonas`,
//   age: 30,
// };

// const friend = me;
// friend.age = 27;
// console.log(friend, me);

//primitive - stored in call stack
let lastName = 'Williams';
let oldLastName = lastName;
lastName = `Davis`;

console.log(lastName, oldLastName);

//object - reference type - stocked in the heap
const jessica = {
  firstName: `Jessica`,
  lastName: `Williams`,
  age: 27,
};

//marriedJessica now points to the same reference type as object jessica
const marriedJessica = jessica;
marriedJessica.lastName = `Davis`;
console.log(`Before marriage: `, jessica); //both the same
console.log(`After marriage:`, jessica); //both the same

const jessica2 = {
  firstName: `Jessica`,
  lastName: `Williams`,
  age: 27,
};

//function will create a new object, this only works on the first level.
const jessicaCopy = Object.assign({}, jessica2);
//using function above will create a new object that when we now assign lastName a new value it won't influence the object that we copy the data from. The function creates a new object within the heap that jessicaCopy will point to instead of the original object.
jessicaCopy.lastName = 'Davis';
console.log(jessicaCopy, jessica2);
