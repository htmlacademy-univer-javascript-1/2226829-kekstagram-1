import {isKeyEsc} from './util.js';

const INIT_COMMENTS_COUNT = 5;
const COMMENTS_COUNT_STEP = 5;

const photoModalElement = document.querySelector('.big-picture');
const commentCountElement = document.querySelector('.comments-count');
const commentsLoaderElement = document.querySelector('.comments-loader');
const imageElement = document.querySelector('.big-picture__img img');
const likesCountElement = document.querySelector('.likes-count');
const descriptionElement = document.querySelector('.social__caption');
const buttonCloseElement = document.querySelector('#picture-cancel');

const commentListElement = document.querySelector('.social__comments');

let currentComments;
let renderedComments;
let currentCommentsCount;


const commentTemplate = document.querySelector('#comment').content
  .querySelector('.social__comment');

const renderComment = (comment) => {
  const commentElement = commentTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  return commentElement;
};

const renderComments = (commentsCount) => {
  const commentsFragment = document.createDocumentFragment();
  while (commentsCount > 0 && renderedComments !== currentCommentsCount) {
    const commentElement = renderComment(currentComments[renderedComments]);
    commentsFragment.appendChild(commentElement);
    renderedComments++;
    commentsCount--;
  }
  if (renderedComments === currentCommentsCount) {
    commentsLoaderElement.classList.add('hidden');
  }
  commentCountElement.textContent = `${renderedComments} из ${currentCommentsCount} комментариев`;
  commentListElement.appendChild(commentsFragment);
};


const closePhotoModal = () => {
  photoModalElement.classList.add('hidden');
  commentCountElement.parentElement.classList.remove('hidden');
  commentsLoaderElement.classList.remove('hidden');
  document.body.classList.remove('modal-open');
};

const onPhotoModalKeydown = (evt) => {
  if (isKeyEsc(evt.key)) {
    closePhotoModal();
    document.removeEventListener('keydown', onPhotoModalKeydown);
  }
};

const onPhotoModalCloseClick = () => {
  closePhotoModal();
};

const onCommentsLoadButtonClick = () => {
  renderComments(COMMENTS_COUNT_STEP);
};

export const openPhotoModal = ({url,likes,comments,description}) => {
  imageElement.src = url;
  currentComments = comments;
  currentCommentsCount = currentComments.length;

  commentCountElement.textContent = currentComments.length;
  likesCountElement.textContent = likes;
  descriptionElement.textContent = description;

  renderedComments = 0;
  commentListElement.textContent = '';
  commentListElement.innerHTML = '';

  document.body.classList.add('modal-open');
  photoModalElement.classList.remove('hidden');
  commentCountElement.classList.remove('hidden');

  if (currentComments.length <= INIT_COMMENTS_COUNT) {
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
    commentsLoaderElement.addEventListener('click',onCommentsLoadButtonClick);
  }
  const initCommentsCount = currentCommentsCount <= INIT_COMMENTS_COUNT ? currentCommentsCount : INIT_COMMENTS_COUNT;
  renderComments(initCommentsCount);
  document.addEventListener('keydown', onPhotoModalKeydown);
  buttonCloseElement.addEventListener('click', onPhotoModalCloseClick, {once: true});
};
