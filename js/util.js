import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';

const ESCAPE_KEY = 'Escape';

let commentInd = 1;
const createRandomComments = (messages) => Array.from({length: faker.datatype.number({min: 0, max: 10})}).map(() => ({
  id: commentInd++,
  avatar: `img/avatar-${faker.datatype.number({min: 1, max: 6})}.svg`,
  message : Math.random() >= 0.5 ? messages[faker.datatype.number({min: 0, max: messages.length-1})] :
    `${messages[faker.datatype.number({min: 0, max: messages.length-1})]} ${messages[faker.datatype.number({min: 0, max: messages.length-1})]}`,
  name: faker.name.firstName(),
}));

const isKeyEsc = (keyCode) => keyCode === ESCAPE_KEY;

const getRandomUniquePhotos = (photos, n) => {
  const result = new Array(n);
  let len = photos.length;
  const taken = new Array(len);
  while (n--) {
    const x = Math.floor(Math.random() * len);
    result[n] = photos[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};

function debounce (callback, timeoutDelay) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;
  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

function throttle (callback, delayBetweenFrames) {
  // Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось
  // к возвращаемой функции с условием, тогда мы его сможем перезаписывать
  let lastTime = 0;
  return (...rest) => {
    // Получаем текущую дату в миллисекундах,
    // чтобы можно было в дальнейшем
    // вычислять разницу между кадрами
    const now = new Date();

    // Если время между кадрами больше задержки,
    // вызываем наш колбэк и перезаписываем lastTime
    // временем "последнего кадра"
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

const createPhotos = (messages) => Array.from({length: 25}).map((value, index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: faker.lorem.sentences(faker.datatype.number({min: 0, max: 10})),
  likes: faker.datatype.number({min: 15, max: 200}),
  comments: createRandomComments(messages),
}));

const errorPhotos = Array.from({length:25}).map((value, index) => ({
  id: index + 1,
  url: 'photos/error.jpg',
  description: 'Ошибка загрузки фотографии',
  likes: '-',
  comments: []
}));

export {isKeyEsc,getRandomUniquePhotos,debounce,throttle,createPhotos,errorPhotos};
