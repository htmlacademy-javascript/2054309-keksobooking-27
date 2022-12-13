import {resetForm} from './send-data.js';
import {offerInformationForm} from './validate.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const postSuccessMessage = successMessageTemplate.cloneNode(true);
const postErrorMessage = errorMessageTemplate.cloneNode(true);
const errorButton = postErrorMessage.querySelector('.error__button');

const showErrorModal = () => {
  const windowErrorElemet = document.createElement('div');
  const textErrorElement = document.createElement('p');
  textErrorElement.textContent = 'Что-то пошло совсем не по плану :С Возможно, гремлины украли сервер';
  textErrorElement.style.color = 'black';
  windowErrorElemet.appendChild(textErrorElement);
  windowErrorElemet.style.position = 'absolute';
  windowErrorElemet.style.top = '50%';
  windowErrorElemet.style.left = '50%';
  windowErrorElemet.style.marginTop = '-410px';
  windowErrorElemet.style.marginLeft = '-200px';
  windowErrorElemet.style.width = '400px';
  windowErrorElemet.style.backgroundColor = 'red';
  windowErrorElemet.style.borderRadius = '8px';
  windowErrorElemet.style.border = '5px solid #ffaaff';
  windowErrorElemet.style.padding = ' 5px 10px';
  document.body.append(windowErrorElemet);

  setTimeout(() => {
    windowErrorElemet.remove();
  }, 5000);
};

const onClickSuccessMessage = () => {
  postSuccessMessage.remove();
  document.removeEventListener('keydown', isEscapeKey);
  document.removeEventListener('click', onClickSuccessMessage);
};

const onClickErrorMessage = () => {
  postErrorMessage.remove();
  document.removeEventListener('keydown', isEscapeKey);
  document.removeEventListener('click', onClickErrorMessage);
  errorButton.removeEventListener('click', onClickErrorMessage);
};

const showSuccessMessage = () => {
  document.body.append(postSuccessMessage);
  document.addEventListener('keydown', isEscapeKey);
  document.addEventListener('click', onClickSuccessMessage);
  resetForm(offerInformationForm);
};

const showErrorMessage = () => {
  document.body.append(postErrorMessage);
  document.addEventListener('keydown', isEscapeKey);
  document.addEventListener('click', onClickErrorMessage);
  errorButton.addEventListener('click', onClickErrorMessage);
};

//нужно всплывание, поэтому не стрелочная
function isEscapeKey(evt) {
  evt.preventDefault();
  if (evt.key === 'Escape') {
    onClickSuccessMessage();
    onClickErrorMessage();
  }
}

export {showErrorModal,showSuccessMessage, showErrorMessage};
