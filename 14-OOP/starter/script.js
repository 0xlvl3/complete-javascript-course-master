'use strict';

//constructors have convention of using a capital letter
const Person = function (firstName, birthYear) {
  //instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  /*
    Never do this
    this.calcAge = function () {
        console.log(2037 - this.birthYear);
    }; 
*/
};

//calling constructor function
const jonas = new Person('Jonas', 1991);
const jack = new Person('Jack', 1994);
const matilda = new Person('Matilda', 1993);

//1. New {} is created
//2. function is called, this = {}
//3. {} linked to prototype
//4. function automatically returns {}

console.log(jonas);
console.log(matilda);
console.log(jack);
console.log(jonas instanceof Person); //returns boolean true
// console.log(jay instanceof Person); - will throw error because jay does not exist

// Prototypes
console.log(Person.prototype);

//how to add methods to a constructor
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};
//calling the method on jonas Person
jonas.calcAge(1994);

//how to look at the prototypes of our objects
console.log(jonas.__proto__);
console.log(jack.__proto__);

console.log(Person.prototype.isPrototypeOf(jonas)); //we call this on objects related to Person not the Person constructor itself but on instances of that object

Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species); //they will return with a species
console.log(jonas); //this won't show that they have that prototype though
console.log(jonas.hasOwnProperty('species')); //returns false, because species does not have it's own property within the object, it is just in the prototype property of Person.

/*
Object Oriented Programming (OOP)
Coding Challenge #1

Your tasks:
1. Use a constructor function to implement a 'Car'. A car has a 'make' and a
'speed' property. The 'speed' property is the current speed of the car in
km/h

2. Implement an 'accelerate' method that will increase the car's speed by 10,
and log the new speed to the console

3. Implement a 'brake' method that will decrease the car's speed by 5, and log
the new speed to the console

4. Create 2 'Car' objects and experiment with calling 'accelerate' and
'brake' multiple times on each of them

Test data:
§ Data car 1: 'BMW' going at 120 km/h
§ Data car 2: 'Mercedes' going at 95 km/h
GOOD LUCK 😀
*/

//Car Constructor
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

//Car methods
Car.prototype.accelerate = function () {
  return this.speed + 10;
};
Car.prototype.brake = function () {
  return this.speed - 5;
};

//Instances
const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

//Test Data
console.log(bmw, mercedes);
console.log(bmw.accelerate(), bmw.brake());
console.log(mercedes.accelerate(), mercedes.brake());
console.log(bmw.__proto__);

//.__proto__ will show the associated methods that jonas can use
console.log(jonas.__proto__ === Person.prototype);
console.log(jonas.__proto__.__proto__); //returns the top of prototype chain Object.prototype
console.log(Person.prototype.constructor); //returns the whole constructor
console.dir(Person.prototype.constructor); //returns the whole constructor
