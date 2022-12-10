import {groupOfMarkers, renderStartMarkers} from './map.js';
import {debounce, checkPricesRange} from './util.js';
import {OBJECTS_COUNT} from './util.js';

const DEBOUNCE_TIME = 500;
const PRICE_INTERVALS = {
  bottom: {
    min: 0,
    max: 10000
  },
  middle: {
    min: 10000,
    max: 50000
  },
  top: {
    min: 50000,
    max: 100000
  }
};

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const featuresCheckboxes = document.querySelectorAll('[name="features"]');

const typeFilter = ({offer}) => {
  if (housingType.value === 'any') {
    return true;
  }
  return housingType.value === offer.type;
};

const priceFilter = ({offer}) => {
  if (housingPrice.value === 'any') {
    return true;
  }
  return checkPricesRange(offer.price, PRICE_INTERVALS[housingPrice.value].min, PRICE_INTERVALS[housingPrice.value].max);
};

const roomsFilter = ({ offer }) => {
  if (housingRooms.value === 'any') {
    return true;
  }
  return housingRooms.value === offer.rooms.toString();
};

const guestsFilter = ({ offer }) => {
  if (housingGuests.value === 'any') {
    return true;
  }
  return housingGuests.value === offer.guests.toString();
};

const featuresFilter = ({ offer }) =>
  Array.from(featuresCheckboxes).every((featureCheckbox) => {
    if (!featureCheckbox.checked) {
      return true;
    }
    if (!offer.features) {
      return false;
    }
    return offer.features.includes(featureCheckbox.value);
  });

const activateFilter = (cb) => {
  mapFilters.addEventListener('change', debounce(() => {
    groupOfMarkers.clearLayers();
    cb();
  }, DEBOUNCE_TIME));
};

const resetFilters = () => {
  groupOfMarkers.clearLayers();
  renderStartMarkers();
  mapFilters.reset();
};

const compareOffers = (offerA, offerB) => {
  const resultOfferA = offerA.offer.features ? offerA.offer.length : 0;
  const resultOfferB = offerB.offer.features ? offerB.offer.length : 0;

  return resultOfferB - resultOfferA;
};

const filterOffers = (arr) => {
  const filteredAds = [];
  let i = 0;
  while (filteredAds.length <= OBJECTS_COUNT && i < arr.length) {
    if (typeFilter(arr[i]) && priceFilter(arr[i]) && roomsFilter(arr[i]) && guestsFilter(arr[i]) && featuresFilter(arr[i])) {
      filteredAds.push(arr[i]);
    }
    i++;
  }
  return filteredAds.sort(compareOffers);
};

export {activateFilter, resetFilters, filterOffers};
