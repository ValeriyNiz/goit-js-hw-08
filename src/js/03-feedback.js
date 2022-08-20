import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const formData = localStorage.getItem('feedback-form-state');

if (formData) {
  const { email, message } = JSON.parse(formData);

  form.elements.email.value = email;
  form.elements.message.value = message;
}

form.addEventListener('submit', e => {
  e.preventDefault();

  localStorage.clear();

  console.log({
    email: e.currentTarget.elements.email.value,
    message: e.currentTarget.elements.message.value,
  });

  form.reset();
});

const onInput = throttle(e => {
  const email = form.elements.email.value;
  const message = form.elements.message.value;

  localStorage.setItem(
    'feedback-form-state',
    JSON.stringify({ email, message })
  );
}, 500);

form.addEventListener('input', onInput);
