const getRandomPositiveInteger = (a, b) => {
  // Если переданы отрицительные числа, возвращаем NaN
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveFloat = (left, right, digits = 1) => {
  if (left < 0 || right < 0 || digits < 0 || left === right) {
    return NaN;
  }

  const lower = Math.min(left, right);
  const upper = Math.max(left, right);
  const result = Math.random() * (upper - lower) + lower;

  return +result.toFixed(digits);
};

const countImgNumber = createCounter();

const getRandomArrayElement = (arr) => arr[getRandomPositiveInteger(0, arr.length - 1)];
const transformImgNumber = (number) => number.toString().padStart(2, '0');

function getRandomArrayLength(arr) {
  const clippedArray = [];
  const arrayLength = getRandomPositiveInteger(1, arr.length);
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

export {getRandomPositiveFloat, countImgNumber, getRandomArrayElement, transformImgNumber, getRandomArrayLength, getRandomPositiveInteger};
