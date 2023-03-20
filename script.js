'use strict';

//& Defining variables to select elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');

const dieElement = document.querySelector('.die');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//& Functions
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

const initGame = function () {
  //* 1. Set starting conditions
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  //* 2. Reset the scores onscreen (both current and total)
  for (let i = 0; i < document.querySelectorAll('.score').length; i++) {
    document.getElementById(`current--${i}`).textContent = 0;
    document.getElementById(`score--${i}`).textContent = 0;
  }

  //* 3. Hide die and remove winner shading
  dieElement.classList.add('hidden');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');

  //* 4. Set the active player to Player 1
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
};

initGame();

//& Die rolling functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //* 1. Generate a random die roll (Fun Fact: die is singular, dice is plural)
    const die = Math.trunc(Math.random() * 6) + 1;

    //* 2. Display the die
    dieElement.classList.remove('hidden');
    dieElement.src = `dice-${die}.png`;

    //* 3. Check for a rolled 1: if true, switch to next player
    if (die !== 1) {
      //& Add die roll to current score
      currentScore += die;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //& Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //* 1. Add current score to score of current player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //* 2. Check if active player's core is >= 100; if yes, finish the game
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      dieElement.classList.add('hidden');
    } else {
      //* 3. If no, switch the active player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', initGame);
