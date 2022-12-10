import {switchPageMode, switchStateMapFilters, switchStateAdForm} from './user-form.js';
import {renderMarker, map, renderStartMarkers, mainSettings} from './map.js';
import {getData} from './api.js';
import {showErrorMessage, showSuccessMessage} from './message-templates.js';
import {filterOffers, activateFilter} from './filter.js';
import {setAdFormSubmit} from './send-data.js';

switchPageMode();

map.on('load', () => {
  switchStateAdForm();
  getData((ads) => {
    renderStartMarkers();
    switchStateMapFilters();
    activateFilter(() => {
      renderMarker(filterOffers(ads));
    });
  }, showErrorMessage);
}).setView({
  lat: mainSettings.lat,
  lng: mainSettings.lng
}, mainSettings.zoom);

setAdFormSubmit(showSuccessMessage, showErrorMessage);

