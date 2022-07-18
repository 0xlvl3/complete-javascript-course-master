'use strict';
/*
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



};
//not in the prototype, so only on constructor won't be inherited
Person.hey = function () {
  console.log(`wave👋`);
  //will return the contructor here
  console.log(this);
};
Person.hey();

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

//ES6 CLASSES

//class expression
// const PersonCl = class {}

//class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  //methods outside of constructor, on .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  //no commas needed between methods
  greet() {
    console.log(`Hello my name is ${this.fullName}`);
  }
  //getter
  get age() {
    return 2020 - this.birthYear;
  }
  //setter
  //Set a property that already exists
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
  }
  //how to get around callstack error with _fullName
  get fullName() {
    return this._fullName;
  }

  //STATIC method, not instance
  static hey() {
    console.log(`wave 👋`);
    console.log(this);
  }
}

const emma = new PersonCl('Emma Coco', 1990);
console.log(emma);
console.log(emma.__proto__); //shows method on prototype
emma.calcAge();
emma.greet();
console.log(emma.age);

//1. Classes are NOT hoisted
//2. Classes are first-class citizens
//3. Classes are executed in strict mode

//GETTERS and SETTERS
const account = {
  owner: 'jonas',
  movements: [200, 300, 400, 500],

  //getter
  get latest() {
    return this.movements.slice(-1).pop();
  },

  //setter needs a parameter
  set latest(move) {
    return this.movements.push(move);
  },
};
//calling getter
console.log(account.latest);

//calling setter and placing 50 at the end of our array
account.latest = 50;
console.log(account.movements);
PersonCl.hey();



const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 1990;
steven.calcAge();

console.log(steven.__proto__);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1997);
console.log(sarah);
sarah.calcAge();

Coding Challenge #2
Your tasks:
1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')

2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide
by 1.6)

3. Add a setter called 'speedUS' which sets the current speed in mi/h (but
converts it to km/h before storing the value, by multiplying the input by 1.6)

4. Create a new car and experiment with the 'accelerate' and 'brake'
methods, and with the getter and setter.

Test data:
§ Data car 1: 'Ford' going at 120 km/h
GOOD LUCK 😀



//class declaration
class CarCl {
  //constructor
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  //Car methods
  accelerate() {
    return this.speed + 10;
  }
  brake() {
    return this.speed - 5;
  }
  //getters
  get speedUS() {
    return this.speed / 1.6;
  }
  //setters
  set speedUS(s) {
    this.speed = s * 1.6;
  }
}

const ford = new CarCl('Ford', 120);
console.log(ford);
console.log(ford.accelerate());
console.log(ford.brake());
console.log(`${ford.speedUS}mi/h`);
ford.speedUS = 100;
console.log(ford.speedUS);
console.log(ford);



//Inheritance between 'classes': constructor functions
const Person = function (firstName, birthYear) {
  //instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  //introducing a parent class to this child
  Person.call(this, firstName, birthYear);
  this.course = course;
};

//student will now inherit Person methods through the create method, not you can not do this before you give Student any methods as Object.create, creates new methods and will earse any that are declared before.
Student.prototype = Object.create(Person.prototype); //linking prototypes

Student.prototype.introduce = function () {
  console.log(`Hey my name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
console.log(mike);
mike.introduce();
mike.calcAge();
console.log(mike.__proto__); //Student.prototype
console.log(mike.__proto__.__proto__); //Person.Student.prototype

Student.prototype.constructor = Student; //without this, Student constructor was pointing to Person, after it now points to Student
console.dir(Student.prototype.constructor); //test from above


Coding Challenge #3

Your tasks:

1. Use a constructor function to implement an Electric Car (called 'EV') as a child "class" of 'Car'. Besides a make and current speed, the 'EV' also has the
current battery charge in % ('charge' property)

2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo'

3. Implement an 'accelerate' method that will increase the car's speed by 20,
and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140
km/h, with a charge of 22%'

4. Create an electric car object and experiment with calling 'accelerate',
'brake' and 'chargeBattery' (charge to 90%). Notice what happens when
you 'accelerate'! Hint: Review the definiton of polymorphism 😉

Test data:
§ Data car 1: 'Tesla' going at 120 km/h, with a charge of 23%
GOOD LUCK 😀



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

//EV constructor
const EV = function (make, speed, charge) {
  //parent inherited
  Car.call(this, make, speed);
  //ev properties
  this.charge = charge;
};

// Student.prototype = Object.create(Person.prototype);
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.speed}km/h, with a charge of ${this.charge}%`
  );
};

const telsa = new EV('Tesla', 120, 23);
console.log(telsa);

EV.prototype.constructor = EV;
console.dir(EV.prototype.constructor);

telsa.chargeBattery(90);
console.log(telsa);
telsa.accelerate();
console.log(telsa.brake());


//INHERITANCE BETWEEN CLASSES
/////////////////////////////////////////

//class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  //methods outside of constructor, on .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  //no commas needed between methods
  greet() {
    console.log(`Hello my name is ${this.fullName}`);
  }
  //getter
  get age() {
    return 2020 - this.birthYear;
  }
  //setter
  //Set a property that already exists
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
  }
  //how to get around callstack error with _fullName
  get fullName() {
    return this._fullName;
  }

  //STATIC method, not instance
  static hey() {
    console.log(`wave 👋`);
    console.log(this);
  }
}

class StudentCl extends PersonCl {
  //below you still need to pass in the argu of the parent class + also properties of this class you wish to include.
  constructor(fullName, birthYear, course) {
    //super needs to be always called first
    super(fullName, birthYear); //same as PersonCl.call(this, fullName, birthYear)
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I am studying ${this.course}`);
  }

  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const mike = new StudentCl('Mike Soeus', 1991, 'Computer Science');
console.log(mike);
mike.introduce();
mike.calcAge(); //this calcAge will overwrite the Parent class method

////////////////////////////////////////////////
//Inheritance Between 'Classes': Object.create

const PersonProto = {
  calcAge() {
    console.log(`My age would be ${2037 - this.birthYear}`);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I am taking ${this.course}`);
};

const jay = Object.create(StudentProto);

console.log(jay.__proto__);
jay.init('Jay', 2010, 'Computer Science');
console.log(jay);
jay.introduce();
jay.calcAge();


*/

//Fields are definded outside of the constructor
//1. Public fields
//2. Private fields

//3. Public methods
//4. Private methods

class Account {
  //1. Public field (instances) referenacble from this keyword
  locale = navigator.language;

  //2. Private fields
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // this.locale = navigator.language;

    //Protected properties
    this.#pin = pin;
    // this._movements = [];

    console.log(`Thanks for opening an account ${owner}`);
  }

  //3. Public interface(Public Methods)
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
  }

  withdrawal(val) {
    this.deposit(-val);
  }

  requestLoan(val) {
    if (this._approveLoan(val));
    this.deposit(val);
    console.log(`Loan approved`);
  }

  //4. Private methods - not yet implemented
  _approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1);
acc1.deposit(200);
acc1.withdrawal(100);
acc1.requestLoan(1000);

console.log(acc1);
console.log(acc1.getMovements());
//console.log(acc1.#movements); //will throw error because we are trying to access a private field
