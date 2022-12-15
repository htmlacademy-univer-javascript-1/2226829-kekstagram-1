import {openPhotoModal} from './big-photo.js';

const photoListElement = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content
  .querySelector('.picture');
const photoFragment = document.createDocumentFragment();
let loadedPhotos;


const appendPhoto = (photo) => {
  const { id, url, likes, comments } = photo;
  const photoElement = photoTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  photoElement.dataset.id = id;

  photoFragment.appendChild(photoElement);
};

const onPhotoModalClick = (evt) => {
  const photoElement = evt.target.closest('.picture');
  if (photoElement) {
    const clickedPhoto = loadedPhotos.find(({id}) => Number(photoElement.dataset.id) === id);
    openPhotoModal(clickedPhoto);
  }
};

export const renderPhotos = (photos) =>{
  photos.forEach(appendPhoto);
  loadedPhotos = photos;
  photoListElement.appendChild(photoFragment);
  photoListElement.addEventListener('click',onPhotoModalClick);
};

