import {getRandomPositiveFloat, transformImgNumber, countImgNumber, getRandomPositiveInteger, getRandomArrayElement, getRandomArrayLength} from './util.js';

const APARTMENT_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIME_POINTS = ['12:00', '13:00', '14:00'];
const CONVENIENCES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTO_ADDRESSES = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const OBJECTS_COUNT = 10;

const OFFER_TYPE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const COORDINATES = {
  MIN_LAT: 35.65000,
  MAX_LAT: 35.70000,
  MIN_LNG: 139.70000,
  MAX_LNG: 139.80000,
  COUNT_OF_DECIMALS: 5
};

function getCardData() {
  const location = {
    lat: getRandomPositiveFloat(COORDINATES.MIN_LAT, COORDINATES.MAX_LAT, COORDINATES.COUNT_OF_DECIMALS),
    lng: getRandomPositiveFloat(COORDINATES.MIN_LNG, COORDINATES.MAX_LNG, COORDINATES.COUNT_OF_DECIMALS)
  };

  return {
    author: {
      avatar: `img/avatars/user${transformImgNumber(countImgNumber())}.png`
    },

    offer: {
      title: `Я заголовок номер ${getRandomPositiveInteger(1, 100)}`,
      address: `${location.lat}, ${location.lng}`,
      price: `${getRandomPositiveInteger(0, 100000)}`,
      type: OFFER_TYPE[getRandomArrayElement(APARTMENT_TYPES)],
      rooms: getRandomPositiveInteger(1, 3),
      guests: getRandomPositiveInteger(1, 3),
      checkin: getRandomArrayElement(TIME_POINTS),
      checkout: getRandomArrayElement(TIME_POINTS),
      features: getRandomArrayLength(CONVENIENCES),
      description: `Я описание номер ${getRandomPositiveInteger(1, 100)}`,
      photos: getRandomArrayLength(PHOTO_ADDRESSES)
    },

    location: location,
  };
}

const createArrayOfObjects = () => Array.from({length: OBJECTS_COUNT}, (_, index) => getCardData(index));

export {createArrayOfObjects};
