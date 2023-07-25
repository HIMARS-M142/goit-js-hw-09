const form = document.querySelector('form');
const amountEl = form.querySelector('input[name="amount"]');
const firstDelayEl = form.querySelector('input[name="delay"]');
const stepEl = form.querySelector('input[name="step"]');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const amount = Number(amountEl.value);
  let firstDelay = Number(firstDelayEl.value);
  const step = Number(stepEl.value);
  for (let i = 1; i <= amount; i++) {
    createPromise(i, firstDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    firstDelay += step;
  }
});
