import {getRandomPositiveFloat, transformImgNumber, countImgNumber, getRandomPositiveInteger, getRandomIndex, getRandomArrayLength} from './util.js';

const APARTMENT_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIME_POINTS = ['12:00', '13:00', '14:00'];
const CONVENIENCES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTO_ADDRESSES = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const OBJECTS_COUNT = 10;

function getCardData() {
  const location = {
    lat: getRandomPositiveFloat(35.65000, 35.70000, 5),
    lng: getRandomPositiveFloat(139.70000, 139.80000, 5)
  };

  return {
    author: {
      avatar: `img/avatars/user${transformImgNumber(countImgNumber())}.png`
    },

    offer: {
      title: `Я заголовок номер ${getRandomPositiveInteger(1, 100)}`,
      address: `${location.lat}, ${location.lng}`,
      price: `${getRandomPositiveInteger(100, 500)}`,
      type: `${APARTMENT_TYPES[getRandomIndex(APARTMENT_TYPES)]}`,
      rooms: getRandomPositiveInteger(1, 5),
      guests: getRandomPositiveInteger(1, 4),
      checkin: `${TIME_POINTS[getRandomIndex(TIME_POINTS)]}`,
      checkout: `${TIME_POINTS[getRandomIndex(TIME_POINTS)]}`,
      features: getRandomArrayLength(CONVENIENCES),
      description: `Я описание номер ${getRandomPositiveInteger(1, 100)}`,
      photos: getRandomArrayLength(PHOTO_ADDRESSES)
    },

    location: location,
  };
}

const createArrayOfObjects = Array.from({length: OBJECTS_COUNT}, getCardData);

export {createArrayOfObjects};
