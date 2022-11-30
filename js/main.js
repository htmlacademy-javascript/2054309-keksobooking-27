const getRandomNumber = (min, max) => {
  if (!(typeof min === 'number' && typeof max === 'number')) {
    return NaN;
  }
  if (min > max) {
    const buffer = min;
    min = max;
    max = buffer;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

getRandomNumber(1, 10);

const getRandomPositiveFloat = (left, right, digits = 1) => {
  if (left < 0 || right < 0 || digits < 0) {
    return NaN;
  }

  const lower = Math.min(left, right);
  const upper = Math.max(left, right);
  const result = Math.random() * (upper - lower) + lower;

  return +result.toFixed(digits);
};

getRandomPositiveFloat (1, 10, 3);
