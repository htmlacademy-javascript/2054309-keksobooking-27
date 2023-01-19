const offerInformationForm = document.querySelector('.ad-form');
const uploadButton = document.querySelector('.ad-form__submit');
const resetButton = offerInformationForm.querySelector('.ad-form__reset');
const adFormSlider = offerInformationForm.querySelector('.ad-form__slider');
const mapFilters = document.querySelector('.map__filters');
const mapFields = mapFilters.querySelectorAll('select.map__filter');
const adFormFields = offerInformationForm.querySelectorAll('fieldset');

const switchStateElements = (elements) => {
  elements.forEach = ((element) => {
    element.disabled = !element.disabled;
  });
};

const switchStateMapFilters = () => {
  mapFilters.classList.toggle('map__filters--disabled');

  switchStateElements(mapFields);
};

const switchStateAdForm = () => {
  offerInformationForm.classList.toggle('ad-form--disabled');
  switchStateElements(adFormFields);
};

const switchPageMode = () => {
  switchStateMapFilters();
  switchStateAdForm();
};

const disableUploadButton = () => {
  uploadButton.disabled = true;
  uploadButton.textContent = 'Обожди...';
};

const enableUploadButton = () => {
  uploadButton.disabled = false;
  uploadButton.textContent = 'Опубликовать';
};

export {switchPageMode, disableUploadButton, enableUploadButton, adFormSlider, resetButton};
