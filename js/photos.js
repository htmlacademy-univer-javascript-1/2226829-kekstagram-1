import {photos} from './data.js';

const photoListElement = document.querySelector('.pictures');

const photoTemplate = document.querySelector('#picture').content
  .querySelector('.picture');

const photoFragment = document.createDocumentFragment();
const appendPhoto = (photo) => {
  const { url, likes, comments } = photo;
  const photoElement = photoTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__comments').textContent = comments.length;

  photoFragment.appendChild(photoElement);
};

export const renderPhotos = () =>{
  photos.forEach(appendPhoto);
  photoListElement.appendChild(photoFragment);
};

