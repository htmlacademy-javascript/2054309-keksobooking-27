const offerInformationForm = document.querySelector('.ad-form');

const MIN_SYMBOLS_VALUE = 30;
const MAX_SYMBOLS_VALUE = 100;
const MAX_PRICE = 100000;
const MIN_PRICES_FOR_TYPES = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const typeField = document.querySelector('#type');
const timeInField = document.querySelector('#timein');
const timeOutField = document.querySelector('#timeout');
const titleField = offerInformationForm.querySelector('#title');
const priceField = offerInformationForm.querySelector('#price');
const roomsField = offerInformationForm.querySelector('#room_number');
const capacityField = offerInformationForm.querySelector('#capacity');

const validateTimeIn = () => {
  timeOutField.value = timeInField.value;
  return timeInField.value === timeOutField.value;
};

const validateTimeOut = () => {
  timeInField.value = timeOutField.value;
  return timeOutField.value === timeInField.value;
};

const getPriceErrorMessage = () => `От ${MIN_PRICES_FOR_TYPES[typeField.value]} руб. до ${MAX_PRICE} руб.`;

const validateTitleField = (value) => value.length >= MIN_SYMBOLS_VALUE && value.length <= MAX_SYMBOLS_VALUE;
const validatePriceField = (value) => value <= MAX_PRICE && MIN_PRICES_FOR_TYPES[typeField.value] <= value;
const validateCapacityField = () => roomsField.value === '100' ? capacityField.value === '0' : roomsField.value >= capacityField.value && capacityField.value !== '0';

const initValidateData = () => {

  const getRoomsErrorMessage = () => {
    if (roomsField.value === '100') {
      return 'Не для гостей';
    }
    if (roomsField.value === '3') {
      return 'Должен быть хотя бы 1 гость!';
    }
    if (roomsField.value === '2') {
      return 'Должно быть 1 или 2 гостя!';
    }
    if (roomsField.value === '1') {
      return 'Должен быть ровно 1 гость!';
    }

  };

  const pristine = new Pristine(offerInformationForm, {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    successClass: 'ad-form__element--valid',
    errorTextParent: 'ad-form__element',
    errorTextTag: 'span',
    errorTextClass: 'text-help'
  });

  pristine.addValidator(titleField, validateTitleField, `Введите от ${MIN_SYMBOLS_VALUE} до ${MAX_SYMBOLS_VALUE} символов`);
  pristine.addValidator(priceField, validatePriceField, getPriceErrorMessage);
  pristine.addValidator(capacityField, validateCapacityField, getRoomsErrorMessage);
  pristine.addValidator(timeInField, validateTimeIn);
  pristine.addValidator(timeOutField, validateTimeOut);

  typeField.addEventListener('change', () => {
    priceField.placeholder = MIN_PRICES_FOR_TYPES[typeField.value];
    pristine.validate(priceField);
  });

  capacityField.addEventListener('change', () => {
    pristine.validate(capacityField);
  });

  roomsField.addEventListener('change', () => {
    pristine.validate(capacityField);
  });

  offerInformationForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      offerInformationForm.submit();
    }
  });};

export {initValidateData, priceField};
