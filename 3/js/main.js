import { faker } from '@faker-js/faker';

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

let commentInd = 1;
const createRandomComments = () => Array.from({length: faker.datatype.number({min: 0, max: 10})}).map(() => ({
  id: commentInd++,
  avatar: `img/avatar-${faker.datatype.number({min: 1, max: 6})}.svg`,
  message : Math.random() >= 0.5 ? MESSAGES[faker.datatype.number({min: 0, max: MESSAGES.length-1})] :
    `${MESSAGES[faker.datatype.number({min: 0, max: MESSAGES.length-1})]} ${MESSAGES[faker.datatype.number({min: 0, max: MESSAGES.length-1})]}`,
  name: faker.name.firstName(),
}));


const photos = Array.from({length: 25}).map((value,index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: faker.lorem.sentences(faker.datatype.number({min: 0, max: 10})),
  likes: faker.datatype.number({min: 15, max: 200}),
  comments: createRandomComments(),
}));

// eslint-disable-next-line no-console
console.log(photos);
