const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timelist = document.querySelector(".time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");

let time = 0;
let score = 0;

startBtn.addEventListener("click", onStartBtnClick);

timelist.addEventListener("click", onTimeBtnClick);
board.addEventListener("click", onCircleClick);

function onStartBtnClick(e) {
  e.preventDefault();
  screens[0].classList.add("up");
}

function onTimeBtnClick(e) {
  if (e.target.classList.contains("time-btn")) {
    time = Number(e.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
}

function startGame() {
  createRandomCircle();
  setInterval(decreaseTime, 1000);
  setTime(time);
}

function finishGame() {
  timeEl.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  const color = getRandomHexColor();
  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.backgroundColor = `${color}`;
  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function onCircleClick(e) {
  if (e.target.classList.contains("circle")) {
    score += 1;
    e.target.remove();
    createRandomCircle();
  }
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}
