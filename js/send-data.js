import {updateMainMarker} from './map.js';
import {pristine, setPricePlaceholder, offerInformationForm} from './validate.js';
import {adFormSlider, resetButton, disableUploadButton, enableUploadButton} from './user-form.js';
import {sendData} from './api.js';
import {resetFilters} from './filter.js';

const resetForm = (form) => {
  adFormSlider.noUiSlider.set(0);
  pristine.reset();
  form.reset();
  setPricePlaceholder();
  updateMainMarker();
  resetFilters();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm(offerInformationForm);
});

const setAdFormSubmit = (onSuccess, onError) => {
  offerInformationForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      disableUploadButton();
      const dataForm = new FormData(evt.target);
      sendData(onSuccess, onError, dataForm);
    }
    enableUploadButton();
  });
};

export {setAdFormSubmit, resetForm};
