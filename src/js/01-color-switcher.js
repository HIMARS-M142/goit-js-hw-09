const startBtnEl = document.querySelector('button[data-start]');
const stopBtnEl = document.querySelector('button[data-stop]');
const body = document.body;
let intervalId = null;
let isActive = false;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

startBtnEl.addEventListener('click', onStartBtnClick);
stopBtnEl.addEventListener('click', onStopBtnClick);

function onStartBtnClick(e) {
  if (isActive) {
    return;
  }
  intervalId = setInterval(() => {
    isActive = true;
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  stopBtnEl.disabled = false;
  startBtnEl.disabled = true;
}

function onStopBtnClick(e) {
  clearInterval(intervalId);
  startBtnEl.disabled = false;
  stopBtnEl.disabled = true;
  isActive = false;
}
