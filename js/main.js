'use strict';

let usersPhotosArray = [];

let commentsArray = [];

let messagesArray = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
];

let namesArray = [
  `Артём`,
  `Дмитрий`,
  `Евгения`,
  `Антонина`,
  `Сергей`,
  `Иван`
];

let fakeNumbersGenerator = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let usersCommentsGenerator = (num) => {
  for (let i = 1; i <= num; i++) {
    commentsArray.push({
      url: `'img/avatar-${i}.svg'`,
      message: messagesArray[fakeNumbersGenerator(0, 5)],
      name: namesArray[fakeNumbersGenerator(0, 5)],
    });
  }
};

usersCommentsGenerator(6);

let usersPhotosGenerator = (num) => {
  for (let i = 1; i <= num; i++) {
    usersPhotosArray.push({
      url: `'photos/${i}.jpg'`,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      likes: fakeNumbersGenerator(15, 200),
      comments: commentsArray[fakeNumbersGenerator(0, 5)],
    });
  }
};

usersPhotosGenerator(25);
