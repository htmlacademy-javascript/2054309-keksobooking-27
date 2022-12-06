import {offerInformationForm} from './user-form.js';
import {priceField} from './validate.js';

const MAXIMUM_PRICE = 100000;

const slider = offerInformationForm.querySelector('.ad-form__slider');

const initSlider = () => {

  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: MAXIMUM_PRICE
    },
    start: 0,
    step: 1,
    connect: 'lower',
    format: {
      to: function (cost) {
        return cost.toFixed(0);
      },
      from: function (cost) {
        return parseFloat(cost);
      }
    }
  });

  const pristine = new Pristine(offerInformationForm, {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    successClass: 'ad-form__element--valid',
    errorTextParent: 'ad-form__element',
    errorTextTag: 'span',
    errorTextClass: 'text-help'
  });

  slider.noUiSlider.on('change', () => {
    priceField.value = slider.noUiSlider.get();
    pristine.validate(priceField);
  });

  priceField.addEventListener('input', () => {
    if (!priceField.value) {
      slider.noUiSlider.set(0);
    }
    slider.noUiSlider.set(priceField.value);
  });

  offerInformationForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      evt.target.submit();
    }
  });
};

export {initSlider};