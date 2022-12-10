import {switchPageState} from './user-form.js';
import {renderMarker} from './map.js';
import {getData} from './api.js';
import {showErrorModal, showErrorMessage, showSuccessMessage} from './message-templates.js';
import {setAdFormSubmit} from './send-data.js';

switchPageState();
getData(renderMarker, showErrorModal);
setAdFormSubmit(showSuccessMessage, showErrorMessage);
