import {isKeyEsc} from './util.js';
import {renderSlider,resetEffect} from './photo-effect.js';
import {renderScale,resetScale} from './scale.js';
import {pristine} from './validate.js';

const fileUploadButton = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');

const photoUploadForm = document.querySelector('.img-upload__form');
const textHashtags = photoUploadForm.querySelector('.text__hashtags');
const textDescription = photoUploadForm.querySelector('.text__description');

const buttonCancelElement = photoUploadForm.querySelector('.img-upload__cancel');

const closeOverlay = () => {
  resetEffect();
  resetScale();
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onEscKeydown = (evt) => {
  if (isKeyEsc(evt.key) && evt.target !== textHashtags && evt.target !== textDescription){
    evt.preventDefault();
    closeOverlay();
  }
};

const uploadFile = () => {
  renderSlider();
  renderScale();
  fileUploadButton.addEventListener('change', (evt) => {
    evt.preventDefault();
    document.body.classList.remove('modal-open');
    document.addEventListener('keydown',onEscKeydown,{once:true});
    buttonCancelElement.addEventListener('click',closeOverlay, {once:true});
    overlay.classList.remove('hidden');
  });
};

export const renderFileUpload = () => {
  photoUploadForm.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    if (!isValid){
      evt.preventDefault();
    }
  });
  uploadFile();
};
