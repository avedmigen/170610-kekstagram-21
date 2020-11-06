'use strict';

(() => {
  const effectLevelLine = window.previewOverlay.querySelector(`.effect-level__line`);
  window.effectLevelValue = window.previewOverlay.querySelector(`input[name=effect-level]`);
  window.effectLevelPin = window.previewOverlay.querySelector(`.effect-level__pin`);
  window.effectLevelDepth = window.previewOverlay.querySelector(`.effect-level__depth`);

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

      let PinOffsetLeft = window.effectLevelPin.offsetLeft - shift.x;
      let percent = (PinOffsetLeft / effectLevelLine.offsetWidth * 100);

      if (percent >= 0 && percent <= 100) {
        window.effectLevelPin.style.left = `${percent}%`;
        window.effectLevelDepth.style.width = `${percent}%`;
        window.effectLevelValue.value = percent;
        window.effectLevelValue.setAttribute('value', percent);

        switch (window.imgPreview.classList[1]) {
          case `effects__preview--chrome`:
            window.imgPreview.style.filter = `grayscale(${window.effectLevelValue.value / 100})`;
            break;
          case `effects__preview--sepia`:
            window.imgPreview.style.filter = `sepia(${window.effectLevelValue.value / 100})`;
            break;
          case `effects__preview--marvin`:
            window.imgPreview.style.filter = `invert(${window.effectLevelValue.value}%)`;
            break;
          case `effects__preview--phobos`:
            window.imgPreview.style.filter = `blur(${window.effectLevelValue.value * 0.03}px)`;
            break;
          case `effects__preview--heat`:
            window.imgPreview.style.filter = `brightness(${1 + window.effectLevelValue.value * 0.02})`;
            break;
          default:
            window.imgPreview.style.filter = ``;
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
  };

  window.effectLevelPin.addEventListener(`mousedown`, onEffectLevelLineMouseDown);

})();
