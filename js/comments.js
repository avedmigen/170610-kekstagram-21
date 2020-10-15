'use strict';

(() => {

  let names = [
    `Артём`,
    `Дмитрий`,
    `Евгения`,
    `Антонина`,
    `Сергей`,
    `Иван`
  ];

  let messages = [
    `Всё отлично!`,
    `В целом всё неплохо. Но не всё.`,
    `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
    `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
    `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
    `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
  ];

  window.comments = [];

  window.setComments = (num) => {
    for (let i = 0; i < num; i++) {

      // Перемешай массив
      let shuffledMessages = messages
        .map((a) => ({sort: Math.random(), value: a}))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);

      // Сгенерируй текст комментария
      let commentText = (shuffledMessages.slice(0, window.minMaxRandomize(1, 2))).join(` `);

      // Сгенерируй комментарий
      window.comments.push({
        avatar: `img/avatar-${window.minMaxRandomize(1, 6)}.svg`,
        message: commentText,
        name: names[window.minMaxRandomize(0, names.length - 1)]
      }
      );
    }
  };

})();


