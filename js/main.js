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

// 1. Загрузка нового изображения на сайт и заполнение информации о нём

const uploadFileInput = document.querySelector(`#upload-file`);
const uploadOverlay = document.querySelector(`.img-upload__overlay`);
const documentBody = document.querySelector(`body`);
const uploadCancelBtn = document.querySelector(`#upload-cancel`);

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

// 2. Редактирование изображения и ограничения, накладываемые на поля
// console.log(foo + ` foo`);

// 2.1. Масштаб:

const DEFAULT_TRANSFORM_LEVEL = 100;
const TRANSFORM_LEVEL_STEP = 25;

const scaleControlSmaller = document.querySelector(`.scale__control--smaller`);
const scaleControlBigger = document.querySelector(`.scale__control--bigger`);
const scaleControlValue = document.querySelector(`.scale__control--value`);
const imgUploadPreview = document.querySelector(`.img-upload__preview`);

scaleControlValue.value = `${DEFAULT_TRANSFORM_LEVEL}%`;
let scaleValue = parseInt(scaleControlValue.value, 10);

scaleControlSmaller.addEventListener(`click`, (e) => {
  e.preventDefault();

  if (scaleValue !== TRANSFORM_LEVEL_STEP && scaleValue <= DEFAULT_TRANSFORM_LEVEL) {
    scaleValue = scaleValue - 25;
    scaleControlValue.value = `${scaleValue}%`;
    imgUploadPreview.style.transform = `scale(0.${scaleValue})`;
  }
});

scaleControlBigger.addEventListener(`click`, (e) => {
  e.preventDefault();

  if (scaleValue >= TRANSFORM_LEVEL_STEP && scaleValue < DEFAULT_TRANSFORM_LEVEL) {
    scaleValue += 25;
    scaleControlValue.value = `${scaleValue}%`;
    imgUploadPreview.style.transform = `scale(${scaleValue / 100})`;
  }
});

// 2.2. Наложение эффекта на изображение:

const effectLevelLine = document.querySelector(`.effect-level__line`);
const effectLevelValue = document.querySelector(`.effect-level__value`);
const effectLevelPin = document.querySelector(`.effect-level__pin`);
const effectLevelDepth = document.querySelector(`.effect-level__depth`);

effectLevelLine.addEventListener(`mousedown`, function (e) {
  e.preventDefault();

  let startXCoord = {
    x: e.clientX
  };

  let onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();
    let shift = {
      x: startXCoord.x - moveEvt.clientX,
    };

    startXCoord = {
      x: moveEvt.clientX,
    };

    let PinOffsetLeft = effectLevelPin.offsetLeft - shift.x;
    let percCalc = (PinOffsetLeft / effectLevelLine.offsetWidth * 100);

    if (percCalc >= 0 && percCalc <= 100) {
      effectLevelPin.style.left = `${percCalc}%`;
      effectLevelDepth.style.width = `${percCalc}%`;
      effectLevelValue.value = `${percCalc}`;

      switch (imgUploadPreview.classList[1]) {
        case `effects__preview--chrome`:
          imgUploadPreview.style.filter = `grayscale(${effectLevelValue.value / 100})`;
          break;
        case `effects__preview--sepia`:
          imgUploadPreview.style.filter = `sepia(${effectLevelValue.value / 100})`;
          break;
        case `effects__preview--marvin`:
          imgUploadPreview.style.filter = `invert(${effectLevelValue.value}%)`;
          break;
        case `effects__preview--phobos`:
          imgUploadPreview.style.filter = `blur(${effectLevelValue.value * 0.03}px)`;
          break;
        case `effects__preview--heat`:
          imgUploadPreview.style.filter = `brightness(${1 + effectLevelValue.value * 0.02})`;
          break;
        case `effects__preview--none`:
          imgUploadPreview.style.filter = void 0;
          break;
        default:
          imgUploadPreview.style.filter = void 0;
          break;
      }
    }
  };

  let onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);

});

const DEFAULT_DEPTH_LEVEL = 100;
const effectsItems = document.querySelectorAll(`.effects__item`);

for (let item of effectsItems) {
  item.addEventListener(`click`, (e) => {
    e.preventDefault();
    effectLevelValue.value = null;
    effectLevelPin.style.left = `${DEFAULT_DEPTH_LEVEL}%`;
    effectLevelDepth.style.width = `${DEFAULT_DEPTH_LEVEL}%`;
    let effectClassName = `effects__preview--${item.childNodes[1].value}`;
    imgUploadPreview.classList.remove(imgUploadPreview.classList[1]);
    imgUploadPreview.classList.add(effectClassName);
  });

  item.addEventListener(`keydown`, (e) => {
    if (e.code === `Enter`) {
      e.preventDefault();
      effectLevelValue.value = null;
      effectLevelPin.style.left = `${DEFAULT_DEPTH_LEVEL}%`;
      effectLevelDepth.style.width = `${DEFAULT_DEPTH_LEVEL}%`;
      let effectClassName = `effects__preview--${item.childNodes[1].value}`;
      imgUploadPreview.classList.remove(imgUploadPreview.classList[1]);
      imgUploadPreview.classList.add(effectClassName);
    }
  });
}

