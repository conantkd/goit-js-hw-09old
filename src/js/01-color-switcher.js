const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let intervalId;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function coloringBackground() {
    body.style.backgroundColor = getRandomHexColor();
    startButton.setAttribute('disabled', 'true');
  if (!intervalId) {
    intervalId = setInterval(() => {
      body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  }
}

function stop() {
  clearInterval(intervalId);
  intervalId = null;
  startButton.removeAttribute('disabled');
}

startButton.addEventListener('click', coloringBackground);

stopButton.addEventListener('click', stop);
