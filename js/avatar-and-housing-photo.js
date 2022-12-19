const DEFAULT_AVATAR_ADDRESS = 'img/muffin-grey.svg';

const avatarDisplay = document.querySelector('.ad-form-header__preview img');
const adFormField = document.querySelector('.ad-form__field');
const avatarUpload = adFormField.querySelector('#avatar');

const adFormPhoto = document.querySelector('.ad-form__upload');
const housePhotoUpload = adFormPhoto.querySelector('#images');
const housePhotoDisplay = document.querySelector('.ad-form__photo');

const initPhotoBlocks = () => {
  avatarUpload.addEventListener('change', () => {
    const newAvatar = avatarUpload.files[0];
    avatarDisplay.src = URL.createObjectURL(newAvatar);
  });

  housePhotoUpload.addEventListener('change', () => {
    const newPhoto = housePhotoUpload.files[0];
    housePhotoDisplay.style.backgroundImage = `url(${URL.createObjectURL(newPhoto)})`;
    housePhotoDisplay.style.backgroundSize = 'cover';
  });
};

const resetPhotoFields = () => {
  avatarDisplay.src = DEFAULT_AVATAR_ADDRESS;
  housePhotoDisplay.style.backgroundImage = 'none';
};

export {resetPhotoFields, initPhotoBlocks};
