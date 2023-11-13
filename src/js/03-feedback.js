import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const storageKey = 'feedback-form-state';
const savedState = JSON.parse(localStorage.getItem(storageKey)) || {};

const saveFormState = (email, message) => {
  const state = { email, message };
  localStorage.setItem(storageKey, JSON.stringify(state));
};

if (savedState.email) {
  emailInput.value = savedState.email;
}

if (savedState.message) {
  messageInput.value = savedState.message;
}

const saveStateThrottled = throttle(() => {
  const email = emailInput.value;
  const message = messageInput.value;
  saveFormState(email, message);
}, 500);

emailInput.addEventListener('input', saveStateThrottled);
messageInput.addEventListener('input', saveStateThrottled);

form.addEventListener('submit', e => {
  e.preventDefault();

  const email = emailInput.value;
  const message = messageInput.value;

  console.log('Email:', email);
  console.log('Message:', message);

  localStorage.removeItem(storageKey);
  emailInput.value = '';
  messageInput.value = '';
});
