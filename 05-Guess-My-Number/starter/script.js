'use strict';

//DOM == document object model: structured representation of HTML documents. allows JavaScript to access HTML elements and styles to manipulate them.

//querySelector is needed to select elements withiin the HTML doc that we can manipulate
// console.log(document.querySelector('.message').textContent);

// document.querySelector('.message').textContent = 'Correct Number!';
// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 10;

// document.querySelector('.guess').value = 30;
// console.log(document.querySelector('.guess').value);

//secret number that the user has to guess
let secretNum = Math.ceil(Math.random() * 20);
console.log(secretNum);
let score = 20;
let highScore = 0;

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNum = Math.ceil(Math.random() * 20);
  document.querySelector('.score').textContent = score;
  document.querySelector(`.number`).textContent = `?`;
  //we use value here for a number type
  document.querySelector(`.guess`).value = ``;
  document.querySelector('.message').textContent = `Start guessing...`;
  document.querySelector(`body`).style.backgroundColor = `#222`;
  document.querySelector(`.number`).style.width = `15rem`;
});

//an event listener listens for events that occur on the page
//we pass a function in the eventlistener so that when the event occurs we get the output expected
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess);
  //when no user input
  if (!guess) {
    document.querySelector('.message').textContent = 'No number given!';

    //when user input is correct
  } else if (guess === secretNum) {
    document.querySelector('.message').textContent = 'Correct Number!';
    document.querySelector('.number').textContent = secretNum;
    //when player wins changes background color
    //when we manipulate a style we must use strings
    document.querySelector('body').style.backgroundColor = `#60b347`;
    document.querySelector('.number').style.width = `30rem`;
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  } else if (guess !== secretNum) {
    if (score > 1) {
      document.querySelector('.message').textContent =
        guess > secretNum ? 'Too high!' : 'Too low!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = 'You lost the game';
      document.querySelector('.score').textContent = 0;
    }
  }
  //   //when user input is too high
  //   else if (guess > secretNum) {
  //     if (score > 1) {
  //       document.querySelector('.message').textContent = 'Too high';
  //       score--;
  //       document.querySelector('.score').textContent = score;
  //     } else {
  //       document.querySelector('.message').textContent = 'You lost the game';
  //       document.querySelector('.score').textContent = 0;
  //     }
  //     //when user input is too low
  //   } else if (guess < secretNum) {
  //     if (score > 1) {
  //       document.querySelector('.message').textContent = 'Too low';
  //       score--;
  //       document.querySelector('.score').textContent = score;
  //     } else {
  //       document.querySelector('.message').textContent = 'You lost the game';
  //       document.querySelector('.score').textContent = 0;
  //     }
  //   }
});

//this works as well without the function keyword

// document.querySelector('.check').addEventListener('click', () => {
//     console.log(document.querySelector('.guess').value);
//   });

// Coding Challenge #1
// Implement a game rest functionality, so that the player can make a new guess!

// Your tasks:

// 1. Select the element with the 'again' class and attach a click event handler
// 2. In the handler function, restore initial values of the 'score' and
// 'secretNumber' variables
// 3. Restore the initial conditions of the message, number, score and guess input fields
// 4. Also restore the original background color (#222) and number width (15rem)
