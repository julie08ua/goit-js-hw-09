const bodyEl = document.querySelector('body');
const btnStartEl = document.querySelector('[data-start]');
const btnStoptEl = document.querySelector('[data-stop]');

let timerId;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
    
btnStartEl.addEventListener('click', onClickBtnStart);

function onClickBtnStart() {
    timerId = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000);
    btnStartEl.disabled = true;
}

btnStoptEl.addEventListener('click', onClickBtnStop);

function onClickBtnStop() {
    clearInterval(timerId);
    btnStartEl.disabled = false;
}
