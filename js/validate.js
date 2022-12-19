const MAX_SYMBOLS_VALUE = 100;
const MIN_SYMBOLS_VALUE = 30;
const MAX_PRICE = 100000;
const MAX_VALUE_OF_ROOMS = '100';
const MIN_VALUE_OF_GUESTS = '0';
const MIN_PRICES_FOR_TYPES = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const offerInformationForm = document.querySelector('.ad-form');
const titleField = offerInformationForm.querySelector('#title');
const typeField = offerInformationForm.querySelector('#type');
const priceField = offerInformationForm.querySelector('#price');
const roomsField = offerInformationForm.querySelector('#room_number');
const guestsField = offerInformationForm.querySelector('#capacity');
const timeInField = offerInformationForm.querySelector('#timein');
const timeOutField = offerInformationForm.querySelector('#timeout');
const adFormSlider = offerInformationForm.querySelector('.ad-form__slider');

const validateTitle = (value) => value.length >= MIN_SYMBOLS_VALUE && value.length <= MAX_SYMBOLS_VALUE;

const validatePrice = (value) => value >= MIN_PRICES_FOR_TYPES[typeField.value] && value <= MAX_PRICE;

const validateCapacity = () =>
  roomsField.value === MAX_VALUE_OF_ROOMS ? guestsField.value === MIN_VALUE_OF_GUESTS : roomsField.value >= guestsField.value && guestsField.value !== MIN_VALUE_OF_GUESTS;

const getTitleErrorMessage = () => `От ${MIN_SYMBOLS_VALUE} до ${MAX_SYMBOLS_VALUE} символов`;

const getPriceErrorMessage = () => `От ${MIN_PRICES_FOR_TYPES[typeField.value]} руб. до ${MAX_PRICE} руб.`;

const getRoomsErrorMessage = () => {
  if (roomsField.value === MAX_VALUE_OF_ROOMS) {
    return 'Не для гостей';
  }
};

const getGuestsErrorMessage = () => {
  if (guestsField.value === MIN_VALUE_OF_GUESTS) {
    return `Требуется ${MAX_VALUE_OF_ROOMS} комнат`;
  }
  return `Требуется минимум ${guestsField.value} ${guestsField.value === '1' ? 'комната' : 'комнаты'}.`;
};

const setPricePlaceholder = () => {
  priceField.placeholder = MIN_PRICES_FOR_TYPES[typeField.value];
};

noUiSlider.create(adFormSlider, {
  range: {
    min: 0,
    max: MAX_PRICE
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
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

pristine.addValidator(titleField, validateTitle, getTitleErrorMessage());
pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);
pristine.addValidator(guestsField, validateCapacity, getGuestsErrorMessage);
pristine.addValidator(roomsField, validateCapacity, getRoomsErrorMessage);

typeField.addEventListener('change', () => {
  setPricePlaceholder();
  if (priceField.value) {
    pristine.validate(priceField);
  }
});

roomsField.addEventListener('change', () => {
  pristine.validate(guestsField);
});

guestsField.addEventListener('change', () => {
  pristine.validate(roomsField);
});

timeInField.addEventListener('change', () => {
  timeOutField.value = timeInField.value;
});

timeOutField.addEventListener('change', () => {
  timeInField.value = timeOutField.value;
});

adFormSlider.noUiSlider.on('slide', () => {
  priceField.value = adFormSlider.noUiSlider.get();
  pristine.validate(priceField);
});

priceField.addEventListener('input', () => {
  if (!priceField.value) {
    adFormSlider.noUiSlider.set(0);
  }
  adFormSlider.noUiSlider.set(priceField.value);
});

export {offerInformationForm, MAX_PRICE, priceField, pristine, setPricePlaceholder};
