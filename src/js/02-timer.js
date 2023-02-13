import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
const dateTimePicker = document.querySelector('#datetime-picker');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const minute = document.querySelector('[data-minutes]');
const second = document.querySelector('[data-seconds]');

let timer = null;
let nowDate = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDate) {
        if (selectedDate[0] < new Date()) {
            startBtn.disabled = true;
            Notiflix.Notify.failure('Please choose a date in the future');
        } else {
            startBtn.disabled = false;
            Notiflix.Notify.success('Success');
            startBtn.addEventListener('click', countdownTime);
            nowDate = selectedDate[0];
        }
    },
};

function countdownTime() {
    timer = setInterval(() => {
        startBtn.disabled = true;
        const timeLeft = nowDate - new Date();
        const { days, hours, minutes, seconds } = convertMs(timeLeft);
        day.innerHTML = addLeadingZero(days);
        hour.innerHTML = addLeadingZero(hours);
        minute.innerHTML = addLeadingZero(minutes);
        second.innerHTML = addLeadingZero(seconds);
        if (timeLeft <= 1000) {
            Notiflix.Report.warning('Time over')
            clearInterval(timer);
            startBtn.disabled = false;
        }
    }, 1000);
}

function addLeadingZero(number) {
    return String(number).padStart(2, 0);
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
};

flatpickr(dateTimePicker, options);

document.body.style.backgroundColor = '#E0E0E0';