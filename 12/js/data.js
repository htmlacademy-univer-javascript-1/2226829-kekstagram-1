import {createPhotos} from './util.js';

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const photos = createPhotos(MESSAGES);

const EFFECTS = [
  'none', 'effects__preview--sepia', 'effects__preview--marvin',
  'effects__preview--phobos', 'effects__preview--heat', 'effects__preview--chrome',
];

const EFFECT_OPTIONS = {
  'sepia': {
    'noui': {
      range: {
        'min':0,
        'max':1,
      },
      step:0.1,
      format: {
        from: (value) => parseFloat(value).toFixed(1),
        to: (value) => value,
      },
      start:1
    },
    filter: (value) => `sepia(${value})`
  },

  'chrome': {
    'noui': {
      range: {
        'min':0,
        'max':1,
      },
      step:0.1,
      format: {
        from: (value) => parseFloat(value).toFixed(1),
        to: (value) => value,
      },
      start:1
    },
    filter: (value) => `grayscale(${value})`
  },

  'marvin': {
    'noui': {
      range: {
        'min':0,
        'max':100,
      },
      step:1,
      format: {
        from: (value) => parseInt(value,10),
        to: (value) => `${value}%`,
      },
      start:100
    },
    filter: (value) => `invert(${value})`
  },

  'phobos': {
    'noui': {
      range: {
        'min':0,
        'max':3,
      },
      step: 0.1,
      format: {
        from: (value) => parseFloat(value).toFixed(1),
        to: (value) => `${parseFloat(value).toFixed(1)}px`,
      },
      start: 3
    },
    filter: (value) => `blur(${value})`
  },
  'heat': {
    'noui': {
      range: {
        'min':1,
        'max':3,
      },
      step: 0.1,
      format: {
        from: (value) => parseFloat(value).toFixed(1),
        to: (value) => value,
      },
      start:3
    },
    filter: (value) => `brightness(${value})`
  },
};

export {MESSAGES, photos, EFFECTS, EFFECT_OPTIONS};
