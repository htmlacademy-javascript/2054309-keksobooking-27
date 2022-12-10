const offerInformationForm = document.querySelector('.ad-form');
const mapContainer = document.querySelector('.map__filters');
//const formsFields = document.querySelectorAll('select.map__filter, fieldset');
const uploadButton = offerInformationForm.querySelector('.ad-form__submit');
const resetButton = offerInformationForm.querySelector('.ad-form__reset');
const adFormSlider = offerInformationForm.querySelector('.ad-form__slider');
const mapFilters = document.querySelector('.map__filters');
const mapFields = mapFilters.querySelectorAll('select.map__filter');

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

  switchStateElements(mapContainer);
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

export {switchStateAdForm, switchPageMode, disableUploadButton, enableUploadButton, adFormSlider, resetButton, switchStateMapFilters};
