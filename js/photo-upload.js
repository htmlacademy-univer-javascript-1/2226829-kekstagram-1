import {isKeyEsc} from './util.js';
import {renderSlider} from './photo-effect.js';

const MAX_HASHTAGS_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;

const fileUploadButton = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const photoUploadForm = document.querySelector('.img-upload__form');
const textHashtags = photoUploadForm.querySelector('.text__hashtags');
const textDescription = photoUploadForm.querySelector('.text__description');
const buttonCancelElement = photoUploadForm.querySelector('.img-upload__cancel');

renderSlider();

const hashtagRegex = new RegExp('^#[0-9A-Za-zА-Яа-яЁё]{1,19}$');
function isHashtagValid(element) {
  return hashtagRegex.test(element);
}

const hasDuplicates = (hashtags) => new Set(hashtags).size !== hashtags.length;

const isHashtagsValid = (value) => {
  if (value.length === 0) {
    return true;
  }
  const dividedHashtags = value.split(' ');
  return dividedHashtags.every(isHashtagValid);
};

const checkHashtags = (hashtags) => isHashtagsValid(hashtags);

const checkHashtagsCount = (hashtags) => {
  const dividedHashtags = hashtags.split(' ');
  return dividedHashtags.length <= MAX_HASHTAGS_COUNT;
};

const checkHashtagUniqueness = (hashtags) => {
  const dividedHashtags = hashtags.split(' ');
  const keys = dividedHashtags.map((hashtag) => hashtag.toLowerCase());
  return !hasDuplicates(keys);
};

const checkComment = (comment) => comment.length <= MAX_COMMENT_LENGTH;

const pristine = new Pristine(photoUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'has-danger',
  successClass: 'has-success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text-help'
}, true);

pristine.addValidator(
  textHashtags,
  checkHashtagsCount,
  `Нельзя указать больше ${MAX_HASHTAGS_COUNT} хэш-тегов`
);

pristine.addValidator(
  textHashtags,
  checkHashtagUniqueness,
  'Хэш-теги должны быть уникальными'
);

pristine.addValidator(
  textHashtags,
  checkHashtags,
  'Хэш-тег должен начинаться с символа # и состоять из букв и чисел\n' +
  `Максимальная длина одного хэш-тега ${MAX_HASHTAG_LENGTH} символов, включая решётку`
);


pristine.addValidator(
  textDescription,
  checkComment,
  `Максимальная длина комментария ${MAX_COMMENT_LENGTH} символов`
);

const closeOverlay = () => {
  photoUploadForm.reset();
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onEscKeydown = (evt) => {
  if (isKeyEsc(evt.key) && evt.target !== textHashtags && evt.target !== textDescription){
    evt.preventDefault();
    closeOverlay();
  }
};

export const renderFileUpload = () => {
  photoUploadForm.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    if (!isValid){
      evt.preventDefault();
    }
  });


  fileUploadButton.addEventListener('change', () => {
    document.addEventListener('keydown',onEscKeydown);
    buttonCancelElement.addEventListener('click',closeOverlay, {once:true});
    document.body.classList.remove('modal-open');
    overlay.classList.remove('hidden');
  });
};
