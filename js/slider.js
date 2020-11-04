'use strict';

(() => {

  const setup = () => {
    const userImgPreview = document.querySelector(`.img-upload__preview`);

    const effectLevelLine = document.querySelector(`.effect-level__line`);
    const effectLevelValue = document.querySelector(`.effect-level__value`);
    const effectLevelPin = document.querySelector(`.effect-level__pin`);
    const effectLevelDepth = document.querySelector(`.effect-level__depth`);

    const onEffectLevelLineMouseDown = (e) => {
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
        document.removeEventListener(`mouseup`, onMouseUp);
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);

      document.removeEventListener(`mousedown`, onEffectLevelLineMouseDown);
    };

    effectLevelLine.addEventListener(`mousedown`, onEffectLevelLineMouseDown);

  };

  window.slider = {
    setup,
  };

})();
