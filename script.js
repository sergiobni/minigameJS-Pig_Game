'use strict';

/// Selecting & setting DOM elements //
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //This is faster
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

///
let scores, currentScore, activePlayer, playing;

//FUNCTION to init the game
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  player1El.classList.remove('player--active');
  player1El.classList.remove('player--winner');
  player0El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player0El.classList.add('player--active');

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
};

//FUNCTION switch player and set scores
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; /// Change active player
  player0El.classList.toggle('player--active'); /// Change visuals active player
  player1El.classList.toggle('player--active');
  currentScore = 0;
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //Check if rolled 1, then switch player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //add current score to bank
    scores[activePlayer] += currentScore;
    score0El.textContent = scores[0];
    score1El.textContent = scores[1];
    //check if player wins, change color, and deactivate buttons
    if (scores[activePlayer] >= 10) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      playing = false;
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

init();
