const offerInformationForm = document.querySelector('.ad-form');
const fieldsets = offerInformationForm.querySelectorAll('fieldset');
const mapContainer = document.querySelector('.map__filters');
const sliders = offerInformationForm.querySelectorAll('.ad-form__slider');
const mapFilters = mapContainer.querySelectorAll('.map__filter');
const mapFieldsets = mapContainer.querySelectorAll('fieldset');

const disableForm = (form) => form.classList.add(`${form.className}--disabled`);
const enableForm = (form) => form.classList.remove(`${form.className}--disabled`);

const disableInteractiveElements = (elements) => {
  elements.forEach((element) =>
    element.setAttribute('disabled', 'disabled'));
};

const enableInteractiveElements = (elements) => {
  elements.forEach((element) =>
    element.reomoveAttribute('disabled', 'disabled'));
};

const activatePage = () => {
  enableForm(mapContainer);
  enableForm(offerInformationForm);
  enableInteractiveElements(fieldsets);
  enableInteractiveElements(sliders);
  enableInteractiveElements(mapFilters);
  enableInteractiveElements(mapFieldsets);
};

const deactivatePage = () => {
  disableForm(mapContainer);
  disableForm(offerInformationForm);
  disableInteractiveElements(fieldsets);
  disableInteractiveElements(sliders);
  disableInteractiveElements(mapFilters);
  disableInteractiveElements(mapFieldsets);
};

export {activatePage, deactivatePage};
