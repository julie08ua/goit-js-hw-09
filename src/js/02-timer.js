import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const datetimePickerEl = document.querySelector('#datetime-picker');
const btnStartEl = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timerId = selectedDates[0];
    if (timerId < new Date) {
   Notify.failure('Please choose a date in the future');
} else {
    btnStartEl.disabled = false;
}
  },
};

flatpickr(datetimePickerEl, options);

btnStartEl.disabled = true;

btnStartEl.addEventListener('click', () => {
  
  let timeId = setInterval(() => {
    const currentDate = new Date();
    const currentTimer = convertMs(timerId - currentDate);

    days.textContent = addLeadingZero(currentTimer.days);
    hours.textContent = addLeadingZero(currentTimer.hours);
    minutes.textContent = addLeadingZero(currentTimer.minutes);
    seconds.textContent = addLeadingZero(currentTimer.seconds);

    if (timerId - currentDate < 1000) {
      clearInterval(timeId);
    }
  }, 1000);
});

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
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}