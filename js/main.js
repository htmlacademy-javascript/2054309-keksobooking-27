import {switchPageMode} from './user-form.js';
import {renderMarker, map, renderStartMarkers, mainSettings} from './map.js';
import {getData} from './api.js';
import {showErrorMessage, showSuccessMessage} from './message-templates.js';
import {filterOffers, activateFilter} from './filter.js';
import {setAdFormSubmit} from './send-data.js';
import {initPhotoBlocks} from './avatar-and-housing-photo.js';

//switchPageMode();

map.on('load', () => {
  //switchPageMode();
  getData((ads) => {
    renderStartMarkers();
    //switchStateMapFilters();
    switchPageMode();
    activateFilter(() => {
      renderMarker(filterOffers(ads));
    });
  }, showErrorMessage);
}).setView({
  lat: mainSettings.lat,
  lng: mainSettings.lng
}, mainSettings.zoom);

setAdFormSubmit(showSuccessMessage, showErrorMessage);
initPhotoBlocks();

