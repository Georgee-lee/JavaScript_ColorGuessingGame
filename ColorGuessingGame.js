/* eslint-disable spaced-comment */
/* eslint-disable no-loop-func */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-plusplus */

let numSquares = 6;
let colors = [];
let pickedColor;
const squares = document.querySelectorAll('.square');
const colorDisplay = document.getElementById('colorDisplay');
const messageDisplay = document.querySelector('#message');
const h1 = document.getElementById('header');
const resetButton = document.querySelector('#reset');
const modeButtons = document.querySelectorAll('.mode');

function pickColor() {
  const random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function randomColor() {
  //pick a 'red' from 0 -255
  const r = Math.floor(Math.random() * 256);
  //pick a 'green' from 0 -255
  const g = Math.floor(Math.random() * 256);
  //pick a 'blue' from 0 -255
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function generateRandomColors(num) {
  //make an array
  const arr = [];
  //repeat num times
  for (let i = 0; i < num; i++) {
    //get random color and push into arr
    arr.push(randomColor());
  }
  //return that array
  return arr;
}

function reset() {
  colors = generateRandomColors(numSquares);
  //pick a new random color from array
  pickedColor = pickColor();
  //change colorDisplay to match picked color
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = 'new colors';
  messageDisplay.textContent = '';
  //change colors of squares
  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = 'block';
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = 'none';
    }
  }
  h1.style.backgroundColor = 'steelblue';
}

function setupModeButtons() {
  for (let i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener('click', function () {
      modeButtons[0].classList.remove('selected');
      modeButtons[1].classList.remove('selected');
      this.classList.add('selected');
      if (this.textContent === 'Easy') {
        numSquares = 3;
      } else {
        numSquares = 6;
      }
      //this.textContent === 'Easy' ? numSquares = 3 : numSquares = 6;
      reset();
    });
  }
}

function changeColors(color) {
  //loop through all squares
  for (let i = 0; i < squares.length; i++) {
    //change each color to match given color
    squares[i].style.backgroundColor = color;
  }
}

function setupSquares() {
  for (let i = 0; i < squares.length; i++) {
    //add click listeners to squares
    squares[i].addEventListener('click', function () {
      //grab color of clicked square
      const clickedColor = this.style.backgroundColor;
      
      //compare color to pickedColor
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = 'Correct!';
        resetButton.textContent = 'Play Again?';
        changeColors(clickedColor);
        h1.style.backgroundColor = clickedColor;
      } else {
        this.style.backgroundColor = '#232323';
        messageDisplay.textContent = 'Try Again';
      }
    });
  }
}

resetButton.addEventListener('click', function () {
  reset();
});

function init() {
  //modeButtons add listener
  setupModeButtons();
  setupSquares();
  reset();
}

init();
