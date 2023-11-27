import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateTimeSelector = document.querySelector('[id="datetime-picker"]');
const startButton = document.querySelector('[data-start]');
const dataDay = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: 'today',
  minuteIncrement: 1,
  onClose(selectedDates) {
    
    if (selectedDates[0] - new Date() >= 0) {
      
      startButton.removeAttribute('disabled', 'true');
      startButton.addEventListener('click', () => {
        if (selectedDates[0] - new Date() >= 0) {
        let cronometro = 0;
        cronometro = setInterval(() => {
          let ms = selectedDates[0] - new Date();
          let dateDifference = convertMs(ms);
          dataDay.textContent = addLeadingZero(dateDifference.days);
          dataHours.textContent = addLeadingZero(dateDifference.hours);
          dataMinutes.textContent = addLeadingZero(dateDifference.minutes);
          dataSeconds.textContent = addLeadingZero(dateDifference.seconds);

          if (
            dateDifference.days < 1 &&
            dateDifference.hours < 1 &&
            dateDifference.minutes < 1 &&
            dateDifference.seconds < 1
          ) {
            clearInterval(cronometro);
          }
          startButton.addEventListener('click', () => { 
            if ('click') {
              clearInterval(cronometro);
            }
          }
          );
        }, 1000);
      }
});
      
    } else {
      Notiflix.Notify.failure('"Please choose a date in the future"');
      startButton.setAttribute('disabled', 'true');
    }
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  const length = value.toString().length;

  if (length < 2) {
    return value.toString().padStart(2, '0');
  } else {
    return value;
  }
}

flatpickr(dateTimeSelector, options);
