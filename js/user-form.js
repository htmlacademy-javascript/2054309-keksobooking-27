const offerInformationForm = document.querySelector('.ad-form');
const mapContainer = document.querySelector('.map__filters');
const formsFields = document.querySelectorAll('select.map__filter, fieldset');

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

export {switchPageState, offerInformationForm};
