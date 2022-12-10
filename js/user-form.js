const offerInformationForm = document.querySelector('.ad-form');
const mapContainer = document.querySelector('.map__filters');
const formsFields = document.querySelectorAll('select.map__filter, fieldset');
const uploadButton = offerInformationForm.querySelector('.ad-form__submit');
const resetButton = offerInformationForm.querySelector('.ad-form__reset');
const adFormSlider = offerInformationForm.querySelector('.ad-form__slider');

const switchElementsState = () => {
  formsFields.forEach((element) => {
    element.disabled = !element.disabled;
  });
};

const switchPageState = () => {
  offerInformationForm.classList.toggle('ad-form--disabled');
  mapContainer.classList.toggle('map__filters--disabled');
  switchElementsState();
};

const disableUploadButton = () => {
  uploadButton.disabled = true;
  uploadButton.textContent = 'Обожди...';
};

const enableUploadButton = () => {
  uploadButton.disabled = false;
  uploadButton.textContent = 'Опубликовать';
};

export {switchPageState, adFormSlider, resetButton, offerInformationForm, disableUploadButton, enableUploadButton, formsFields};
