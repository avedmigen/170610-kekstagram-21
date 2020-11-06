'use strict';

(() => {
  const userImgPreview = document.querySelector(`.img-upload__preview`);

  const effectLevelLine = window.previewContainer.querySelector(`.effect-level__line`);
  const effectLevelValue = window.previewContainer.querySelector(`input[name=effect-level]`);
  const effectLevelPin = window.previewContainer.querySelector(`.effect-level__pin`);
  const effectLevelDepth = window.previewContainer.querySelector(`.effect-level__depth`);

  const onEffectLevelLineMouseDown = (e) => {
    e.preventDefault();

    let startXCord = {
      x: e.clientX
    };

    let onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();
      let shift = {
        x: startXCord.x - moveEvt.clientX,
      };

      startXCord = {
        x: moveEvt.clientX,
      };

      let PinOffsetLeft = effectLevelPin.offsetLeft - shift.x;
      let percent = (PinOffsetLeft / effectLevelLine.offsetWidth * 100);

      if (percent >= 0 && percent <= 100) {
        effectLevelPin.style.left = `${percent}%`;
        effectLevelDepth.style.width = `${percent}%`;
        effectLevelValue.value = percent;

        switch (userImgPreview.classList[1]) {
          case `effects__preview--chrome`:
            userImgPreview.style.filter = `grayscale(${effectLevelValue.value / 100})`;
            break;
          case `effects__preview--sepia`:
            userImgPreview.style.filter = `sepia(${effectLevelValue.value / 100})`;
            break;
          case `effects__preview--marvin`:
            userImgPreview.style.filter = `invert(${effectLevelValue.value}%)`;
            break;
          case `effects__preview--phobos`:
            userImgPreview.style.filter = `blur(${effectLevelValue.value * 0.03}px)`;
            break;
          case `effects__preview--heat`:
            userImgPreview.style.filter = `brightness(${1 + effectLevelValue.value * 0.02})`;
            break;
          default:
            userImgPreview.style.filter = ``;
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

    // effectLevelPin.removeEventListener(`mousedown`, onEffectLevelLineMouseDown);
  };

  effectLevelPin.addEventListener(`mousedown`, onEffectLevelLineMouseDown);

})();
