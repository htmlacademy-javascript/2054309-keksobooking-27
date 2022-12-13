import {groupOfMarkers, renderStartMarkers} from './map.js';
import {debounce, checkPricesRange} from './util.js';

const DEBOUNCE_TIME = 500;
const PRICE_INTERVALS = {
  low: {
    min: 0,
    max: 10000
  },
  middle: {
    min: 10000,
    max: 50000
  },
  high: {
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

const filterByType = ({offer}) => housingType.value === 'any' ? true : housingType.value === offer.type;
const filterByPrice = ({offer}) => housingPrice.value === 'any' ? true : checkPricesRange(offer.price, PRICE_INTERVALS[housingPrice.value].min, PRICE_INTERVALS[housingPrice.value].max);
const filterByRooms = ({offer}) => housingRooms.value === 'any' ? true : housingRooms.value === offer.rooms.toString();
const filterByGuests = ({offer}) => housingGuests.value === 'any' ? true : housingGuests.value === offer.guests.toString();

const filterByFeatures = ({offer}) =>
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
  const filteredArr = arr.filter((index) => filterByType(index) && filterByPrice(index) && filterByRooms(index) && filterByGuests(index) && filterByFeatures(index))
    .map((index) => index);
  return filteredArr.sort(compareOffers);
};

export {activateFilter, resetFilters, filterOffers};
