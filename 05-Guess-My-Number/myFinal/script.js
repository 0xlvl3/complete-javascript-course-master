"use strict";

//generates random number
const randomNum = () => {
  return Math.ceil(Math.random() * 20);
};

//secret number that the user has to guess
let secretNum = randomNum();
let score = 20;
let highScore = 0;

//message will display text on page
const displayMessage = (message) => {
  document.querySelector(".message").textContent = message;
};
//displays score
const displayScore = (score) => {
  document.querySelector(".score").textContent = score;
};
//center number display
const displayNumber = (input) => {
  document.querySelector(`.number`).textContent = input;
};
//webpage background
const styleBackground = (input) => {
  document.querySelector("body").style.backgroundColor = input;
};
//width of box uses rem
const styleWidth = (width) => {
  document.querySelector(`.number`).style.width = width;
};

document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  secretNum = randomNum();
  displayScore(score);
  displayNumber(`?`);
  //we use value here for a number type
  document.querySelector(`.guess`).value = ``;
  displayMessage("Start guessing..");
  styleBackground(`#222`);
  styleWidth(`15rem`);
});

//game theory of program
document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  console.log(guess);
  //when no user input
  if (!guess) {
    displayMessage("No number given!");

    //when user input is correct
  } else if (guess === secretNum) {
    displayMessage("Correct Number!");
    displayNumber(secretNum);
    styleBackground(`#60b347`);
    styleWidth(`30rem`);
    if (score > highScore) {
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    }
    //gives user feedback on user input if their input is > or <
  } else if (guess !== secretNum) {
    if (score > 1) {
      displayMessage(guess > secretNum ? "Too high!" : "Too low!");
      score--;
      displayScore(score);
      //when user loses
    } else {
      displayMessage("You lost the game");
      displayScore(0);
    }
  }
});
