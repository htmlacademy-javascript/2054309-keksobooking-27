const APARTMENT_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIME_POINTS = ['12:00', '13:00', '14:00'];
const CONVENIENCES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTO_ADDRESSES = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const getRandomNumber = (min, max) => {
  if (min > max) {
    const buffer = min;
    min = max;
    max = buffer;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomPositiveFloat = (left, right, digits = 1) => {
  if (left < 0 || right < 0 || digits < 0) {
    return NaN;
  }

  const lower = Math.min(left, right);
  const upper = Math.max(left, right);
  const result = Math.random() * (upper - lower) + lower;

  return +result.toFixed(digits);
};

const countImgNumber = createCounter();

const getRandomIndex = (arr) => getRandomNumber(0, arr.length - 1);
const transformImgNumber = (number) => number.toString().padStart(2, '0');

function getRandomArrayLength(arr) {
  const clippedArray = [];
  const arrayLength = getRandomNumber(1, arr.length);
  for (let i = 0; i < arrayLength; i++) {
    if (!clippedArray.includes(arr[i])) {
      clippedArray.push(arr[i]);
    }
  }
  return clippedArray;
}

function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

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
      title: `Я заголовок номер ${getRandomNumber(1, 100)}`,
      address: `${location.lat}, ${location.lng}`,
      price: `${getRandomNumber(100, 500)}`,
      type: `${APARTMENT_TYPES[getRandomIndex(APARTMENT_TYPES)]}`,
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 4),
      checkin: `${TIME_POINTS[getRandomIndex(TIME_POINTS)]}`,
      checkout: `${TIME_POINTS[getRandomIndex(TIME_POINTS)]}`,
      features: getRandomArrayLength(CONVENIENCES),
      description: `Я описание номер ${getRandomNumber(1, 100)}`,
      photos: getRandomArrayLength(PHOTO_ADDRESSES)
    },

    location: location,
  };
}

const arrayOfObjects = Array.from({length: 10}, getCardData);

console.log(arrayOfObjects);
