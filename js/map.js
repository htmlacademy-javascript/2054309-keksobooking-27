import {renderCardsData} from './popup.js';
import {OBJECTS_COUNT} from './util.js';
import {showErrorModal} from './message-templates.js';
import {getData} from './api.js';

const addressField = document.querySelector('#address');

const mainSettings = {
  lat: 35.68940,
  lng: 139.69200,
  numberDecimals: 5,
  zoom: 11
};

addressField.value = `${mainSettings.lat.toFixed(mainSettings.numberDecimals)} ${mainSettings.lng.toFixed(mainSettings.numberDecimals)}`;

const map = L.map('map-canvas');

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
).addTo(map);

const mainMarkerIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52]
});

const markerIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const mainPinMarker = L.marker(
  {
    lat: mainSettings.lat,
    lng: mainSettings.lng
  },
  {
    draggable: true,
    icon: mainMarkerIcon
  }
);

mainPinMarker.addTo(map);

mainPinMarker.on('move', (evt) => {
  const latLng = evt.target.getLatLng();
  addressField.value = `${latLng.lat.toFixed(mainSettings.numberDecimals)} ${latLng.lng.toFixed(mainSettings.numberDecimals)}`;
});

const groupOfMarkers = L.layerGroup().addTo(map);


const updateMainMarker = () => {
  mainPinMarker.setLatLng({
    lat: mainSettings.lat,
    lng: mainSettings.lng
  });
  addressField.value = `${mainSettings.lat.toFixed(mainSettings.numberDecimals)} ${mainSettings.lng.toFixed(mainSettings.numberDecimals)}`;
};

const renderMarker = (adList) => {
  const listForRender = adList.slice(0, 10);
  listForRender.forEach(({ location }, index) => {
    const marker = L.marker(
      {
        lat: location.lat,
        lng: location.lng
      },
      {
        icon: markerIcon
      });

    marker
      .addTo(groupOfMarkers)
      .bindPopup(renderCardsData(listForRender, index));
  });
};

const renderStartMarkers = () => {
  getData((ads) => {
    renderMarker(ads.slice(0, OBJECTS_COUNT));
  }, showErrorModal);
};

export {renderMarker, updateMainMarker, groupOfMarkers, renderStartMarkers, map, mainSettings};
