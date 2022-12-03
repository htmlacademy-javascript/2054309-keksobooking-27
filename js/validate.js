const offerInformationForm = document.querySelector('.ad-form');

const MIN_SYMBOLS_VALUE = 30;
const MAX_SYMBOLS_VALUE = 100;
const MAX_PRICE = 100000;

const titleField = offerInformationForm.querySelector('#title');
const priceField = offerInformationForm.querySelector('#price');
const roomsField = offerInformationForm.querySelector('#room_number');
const capacityField = offerInformationForm.querySelector('#capacity');

const validateTitleField = (value) => value.length >= MIN_SYMBOLS_VALUE && value.length <= MAX_SYMBOLS_VALUE;
const validatePriceField = (value) => value <= MAX_PRICE;
const validateCapacityField = () => roomsField.value === '100' ? capacityField.value === '0' : roomsField.value >= capacityField.value && capacityField.value !== '0';

const initValidateData = () => {
  const getCapacityErrorMessage = () => {
    if (roomsField.value === '100') {
      return 'Не для гостей';
    }
    if (capacityField.value === '0') {
      return 'Только для помещений, имеющих 100 комнат!';
    }
    return `Должно быть как минимум ${capacityField.value} комнаты.`;
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
  pristine.addValidator(priceField, validatePriceField, `Цена должна быть не более ${MAX_PRICE} руб.`);
  pristine.addValidator(capacityField, validateCapacityField, getCapacityErrorMessage);
  pristine.addValidator(roomsField, validateCapacityField, getCapacityErrorMessage);

  offerInformationForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      offerInformationForm.submit();
    }
  });};

export {initValidateData};
