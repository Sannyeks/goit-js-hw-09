function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

let intervalID = null;

refs.body.addEventListener('click', onBtnClick);
refs.stopBtn.setAttribute('disabled', true);

function onBtnClick({ target }) {
  if (target === refs.startBtn) clickOnStartBtn();
  if (target === refs.stopBtn) clickOnStopBtn();
}

function clickOnStopBtn() {
  refs.startBtn.removeAttribute('disabled');
  refs.stopBtn.setAttribute('disabled', true);
  clearInterval(intervalID);
}

function clickOnStartBtn() {
  refs.stopBtn.removeAttribute('disabled');
  refs.startBtn.setAttribute('disabled', true);
  intervalID = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}



