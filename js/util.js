const OBJECTS_COUNT = 10;

const debounce = (callback, timeoutDelay) => {

  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const checkPricesRange = (number, min, max) => min <= number && number <= max;

export {debounce, checkPricesRange, OBJECTS_COUNT};
