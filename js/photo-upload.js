import {isKeyEsc} from './util.js';
import {renderSlider,resetEffect} from './photo-effect.js';
import {renderScale,resetScale} from './scale.js';
import {dropValues, pristine} from './validate.js';
import {sendData} from './api.js';
import {onImgInputChange} from './photo-input.js';

const form = document.querySelector('#upload-select-image');

const fileUploadButton = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const photoUploadForm = document.querySelector('.img-upload__form');
const textHashtags = photoUploadForm.querySelector('.text__hashtags');
const textDescription = photoUploadForm.querySelector('.text__description');
const buttonCancelElement = photoUploadForm.querySelector('.img-upload__cancel');

const errorTemplate = document.querySelector('#error');
const successTemplate = document.querySelector('#success');

const onEscKeydown = (evt) => {
  if (isKeyEsc(evt.key) && evt.target !== textHashtags && evt.target !== textDescription){
    evt.preventDefault();
    closeOverlay();
  }
};

function closeOverlay() {
  resetEffect();
  resetScale();
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  buttonCancelElement.removeEventListener('click',closeOverlay);
  document.removeEventListener('keydown',onEscKeydown);
  dropValues();
}

export const uploadFile = () => {
  renderSlider();
  renderScale();
  fileUploadButton.addEventListener('change', (evt) => {
    evt.preventDefault();
    onImgInputChange(evt);
    document.body.classList.remove('modal-open');
    document.addEventListener('keydown',onEscKeydown);
    buttonCancelElement.addEventListener('click',closeOverlay);
    overlay.classList.remove('hidden');
  });
};

const createSuccessBlock = () => {
  const successCopy = successTemplate.cloneNode(true).content.querySelector('.success');

  successCopy.addEventListener(
    'click',
    (evt) => {
      if (evt.target.className !== 'success__inner' && evt.target.className !== 'success__title') {
        document.body.removeChild(successCopy);
        closeOverlay();
      }
    });
  document.body.appendChild(successCopy);
};

const createErrorBlock = (text) => {
  const errorCopy = errorTemplate.cloneNode(true).content.querySelector('.error');
  errorCopy.querySelector('.error__title').textContent = text;

  errorCopy.addEventListener(
    'click',
    (evt) => {
      if (evt.target.className !== 'error__inner' && evt.target.className !== 'error__title') {
        document.body.removeChild(errorCopy);
      }
    });
  document.body.appendChild(errorCopy);
};

export const renderFileUpload = () => {
  photoUploadForm.addEventListener('submit',
    (evt) => {
      evt.preventDefault();
      const isValid = pristine.validate();
      if (isValid) {
        sendData(
          createErrorBlock,
          createSuccessBlock,
          new FormData(form));
        closeOverlay();
      }
    });
  uploadFile();
  resetEffect();
  resetScale();
};
