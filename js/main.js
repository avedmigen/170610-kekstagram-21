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
      url: `photos/${i}.jpg`,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      likes: fakeNumbersGenerator(15, 200),
      comments: [commentsArray[fakeNumbersGenerator(0, 5)]],
    });
  }
};

usersPhotosGenerator(25);

let picturesContainer = document.querySelector(`.pictures`);

let fragment = document.createDocumentFragment();

for (let i = 0; i < usersPhotosArray.length; i++) {
  let newElement = document.createElement(`a`);
  newElement.className = `picture`;
  newElement.innerHTML = `
    <img class="picture__img" src="${usersPhotosArray[i].url}" width="182" height="182" alt="Случайная фотография">
    <p class="picture__info">
      <span class="picture__comments">${usersPhotosArray[i].comments.length}</span>
      <span class="picture__likes">${usersPhotosArray[i].likes}</span>
    </p>`;

  fragment.appendChild(newElement);
}

picturesContainer.appendChild(fragment);

let uploadFileInput = document.querySelector(`#upload-file`);
let uploadOverlay = document.querySelector(`.img-upload__overlay`);
let documentBody = document.querySelector(`body`);
let uploadCancelBtn = document.querySelector(`#upload-cancel`);

// Использовать для отладки и потом убрать
uploadOverlay.classList.toggle(`hidden`);

uploadFileInput.onchange = (e) => {
  e.preventDefault();
  uploadOverlay.classList.toggle(`hidden`);
  documentBody.classList.add(`modal-open`);
};

uploadCancelBtn.addEventListener(`click`, (e) => {
  e.preventDefault();
  uploadOverlay.classList.toggle(`hidden`);
  documentBody.classList.remove(`modal-open`);
  uploadFileInput.value = null;
});

window.addEventListener(`keydown`, (e) => {
  if (e.code === `Escape`) {
    e.preventDefault();
    uploadOverlay.classList.toggle(`hidden`);
    documentBody.classList.remove(`modal-open`);
    uploadFileInput.value = null;
  }
});

let effectsItems = document.querySelectorAll(`.effects__item`);

for (let item of effectsItems) {
  item.addEventListener(`click`, (e) => {
    e.preventDefault();
    effectLevelValue.value = null;
    console.log(effectLevelValue.value);
  });

  item.addEventListener(`keydown`, (e) => {
    if (e.code === `Enter`) {
      e.preventDefault();
      effectLevelValue.value = null;
      console.log(effectLevelValue.value);
    }
  });
}

let effectLevelLine = document.querySelector(`.effect-level__line`);
let effectLevelValue = document.querySelector(`.effect-level__value`);
let effectLevelPin = document.querySelector(`.effect-level__pin`);

document.addEventListener(`mousedown`, function (e) {
  e.preventDefault();

  // Положение мышки по горизонтали
  let mouseXPosition = {
    x: e.offsetX,
  };

  console.log(mouseXPosition.x + ` Положение мышки по горизонтали`);

  // Ширина линии
  let LineOffsetWidht = effectLevelLine.offsetWidth;
  console.log(LineOffsetWidht + `  Ширина линии`);

  // Расстояние линии относительно левого края
  let LineOffsetLeft = effectLevelLine.offsetLeft;

  console.log(LineOffsetLeft + ` Расстояние линии относительно левого края`);

  // Положение пина относительно линии
  let pinXPosition = mouseXPosition.x - LineOffsetLeft;

  console.log(effectLevelPin.offsetLeft + ` Положение пина относительно линии`);

  // Калькулятор процентов

  let percCalc = pinXPosition / LineOffsetWidht * 100;

  console.log(percCalc + ` Калькулятор процентов`);

});
