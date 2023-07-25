// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;
let timerId = null;
let isActive = false;
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (Date.now() > selectedDates[0].getTime()) {
      window.alert('Please choose a date in the future');
      startBtn.disabled = true;
      return;
    } else {
      startBtn.disabled = false;
    }

    startBtn.addEventListener('click', onStartBtnClick);

    function onStartBtnClick(e) {
      if (isActive) {
        return;
      }
      isActive = true;

      timerId = setInterval(() => {
        const timeToEvent = selectedDates[0].getTime() - Date.now();
        const { days, hours, minutes, seconds } = convertMs(timeToEvent);

        document.querySelector('span[data-seconds]').textContent = seconds;
        document.querySelector('span[data-minutes]').textContent = minutes;
        document.querySelector('span[data-hours]').textContent = hours;
        document.querySelector('span[data-days]').textContent = days;
        console.log(convertMs(timeToEvent));
        if (
          seconds === '00' &&
          minutes === '00' &&
          hours === '00' &&
          days === '00'
        ) {
          clearInterval(timerId);
          isActive = false;
        }
      }, 1000);
    }

    function convertMs(ms) {
      // Number of milliseconds per unit of time
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      // Remaining days
      const days = addLeadingZero(Math.floor(ms / day));
      // Remaining hours
      const hours = addLeadingZero(Math.floor((ms % day) / hour));
      // Remaining minutes
      const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
      // Remaining seconds
      const seconds = addLeadingZero(
        Math.floor((((ms % day) % hour) % minute) / second)
      );

      return { days, hours, minutes, seconds };
    }
  },
};
flatpickr('input#datetime-picker', options);
