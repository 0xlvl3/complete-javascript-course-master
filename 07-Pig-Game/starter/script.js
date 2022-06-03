'use strict';

const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
//when we select using an id we use # instead of .
const score0EL = document.querySelector('#score--0');
//above and below are both the same but just using getElement - getElement is meant to be faster than querySelector
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');

const diceEL = document.querySelector('.dice');

let scores, currentScore, activePlayer, playing;

const init = function () {
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  diceEL.classList.add('hidden');
  player0EL.classList.remove(`player--winner`);
  player1EL.classList.remove(`player--winner`);
  player1EL.classList.add(`player--active`);
  player1EL.classList.remove(`player--active`);
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
};
init();

//buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const removeBackground = e => {
  document.querySelector(`.player--${e}`).classList.remove(`player--winner`);
};

score0EL.textContent = 0;
score1EL.textContent = 0;
diceEL.classList.add('hidden');

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

//roll button functionaility
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. generating a random dice roll
    const dice = Math.ceil(Math.random() * 6);
    //2. display dice
    diceEL.classList.remove('hidden');
    //we use the .src and use the dice to cycle through the numbers according to them in png form
    diceEL.src = `dice-${dice}.png`;

    //3. check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      //add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // // switch to next player
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // currentScore = 0;
      // //toggle will toogle class on and off user 1 and 2
      // //toggle will make sure it's only on one or the other
      // player0EL.classList.toggle('player--active');
      // player1EL.classList.toggle('player--active');
      switchPlayer();
    }
  }
});

//hold button
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add current score to active palyer's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. check if score >= 100
    // if true finish the game

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEL.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    }
    //3.Switch to the next player
    switchPlayer();
  }
});

//new game button
btnNew.addEventListener('click', init);
//   current0EL = 0;
//   current1EL = 0;
//   score0EL.textContent = 0;
//   score1EL.textContent = 0;
//   diceEL.classList.add('hidden');
//   player0EL.class.remove(`player--winner`);
//   player1EL.class.remove(`player--winner`);
//   player1EL.class.add(`player--active`);
//   player1EL.class.remove(`player--active`);
