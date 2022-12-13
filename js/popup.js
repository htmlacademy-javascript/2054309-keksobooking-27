const OFFER_TYPE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const renderCardsData = ({ author, offer }) => {
  const cardsDataFragment = document.createDocumentFragment();
  const cardInstance = cardTemplate.cloneNode(true);
  const popupFeatures = cardInstance.querySelector('.popup__features');
  const popupFeaturesList = popupFeatures.querySelectorAll('.popup__feature');
  const popupPhotos = cardInstance.querySelector('.popup__photos');
  const popupPhoto = popupPhotos.querySelector('.popup__photo');

  const renderData = (selector, data, caption = '') => {
    if (!data) {
      cardInstance.querySelector(selector).remove();
    } else {
      cardInstance.querySelector(selector).textContent = data + caption;
    }
  };

  if (!author.avatar) {
    cardInstance.querySelector('.popup__avatar').remove();
  } else {
    cardInstance.querySelector('.popup__avatar').src = author.avatar;
  }

  renderData('.popup__title', offer.title);
  renderData('.popup__text--address', offer.address);
  renderData('.popup__text--price', offer.price, ' ₽/ночь');
  renderData('.popup__type', OFFER_TYPE[offer.type]);
  renderData('.popup__description', offer.description);

  if (!offer.rooms || !offer.guests) {
    cardInstance.querySelector('.popup__text--capacity').remove();
  } else {
    cardInstance.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  }

  if (!offer.checkin || !offer.checkout) {
    cardInstance.querySelector('.popup__text--time').remove();
  } else {
    cardInstance.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  }

  if (!offer.features) {
    popupFeatures.remove();
  } else {
    popupFeaturesList.forEach((listItem) => {
      const isRequired = offer.features.some((feature) =>
        listItem.classList.contains(`popup__feature--${feature}`));

      if (!isRequired) {
        listItem.remove();
      }
    });
  }

  if (!offer.photos) {
    popupPhotos.remove();
  } else {
    popupPhoto.src = offer.photos[0];

    if (offer.photos.length > 1) {
      for (let i = 1; i < offer.photos.length; i++) {
        const popupPhotoElement = popupPhoto.cloneNode(true);
        popupPhotoElement.src = offer.photos[i];
        popupPhotos.append(popupPhotoElement);
      }
    }
  }

  cardsDataFragment.append(cardInstance);

  return cardInstance;
};

export {renderCardsData};
