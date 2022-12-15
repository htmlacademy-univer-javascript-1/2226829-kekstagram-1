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

export {isKeyEsc,createPhotos,errorPhotos};
