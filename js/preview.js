'use strict';
// 2. Редактирование изображения и ограничения, накладываемые на поля

(() => {
  const DEFAULT_TRANSFORM_LEVEL = 100;
  const TRANSFORM_LEVEL_STEP = 25;
  const DEFAULT_DEPTH_LEVEL = 100;

  // 2.1. Масштаб:

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
          default:
            imgUploadPreview.style.filter = ``;
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
      imgUploadPreview.style.filter = ``;
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
        imgUploadPreview.style.filter = ``;
      }
    });
  }

})();
