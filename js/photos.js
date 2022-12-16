import {openPhotoModal} from './big-photo.js';
import {getRandomUniquePhotos} from './util.js';
import { debounce } from './util.js';

const photoListElement = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content
  .querySelector('.picture');
const photoFragment = document.createDocumentFragment();
const filterButtons = document.querySelectorAll('.img-filters__button');
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

const renderPhotos = (photos,option) =>{
  document.querySelectorAll('.picture').forEach((photo) => photo.remove() );
  if (option === 'filter-default') {
    photos.forEach(appendPhoto);
  } else if (option === 'filter-random') {
    getRandomUniquePhotos(photos, 10).forEach(appendPhoto);
  } else {
    const photosSorted =  Array.from(photos);
    photosSorted.sort((a, b) =>  b.comments.length - a.comments.length);
    photosSorted.forEach(appendPhoto);
  }
  loadedPhotos = photos;
  photoListElement.appendChild(photoFragment);
  photoListElement.addEventListener('click',onPhotoModalClick);
};

const debounceRenderedPhotos = debounce(renderPhotos, 500);
const createEventListenersFilter = () => {
  filterButtons.forEach((filterButton) => {
    filterButton.addEventListener('click', () => {
      filterButtons.forEach((button) =>
        button.classList.remove('img-filters__button--active'));
      filterButton.classList.add('img-filters__button--active');
      debounceRenderedPhotos(loadedPhotos, filterButton.id);
    });
  });
};

export {renderPhotos,createEventListenersFilter};

