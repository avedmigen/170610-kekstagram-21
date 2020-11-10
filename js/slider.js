'use strict';

(() => {
  const DEFAULT_VALUE = 100;

  const effectLevelLine = window.previewOverlay.querySelector(`.effect-level__line`);
  window.effectLevelValue = window.previewOverlay.querySelector(`input[name=effect-level]`);
  window.effectLevelPin = window.previewOverlay.querySelector(`.effect-level__pin`);
  window.effectLevelDepth = window.previewOverlay.querySelector(`.effect-level__depth`);

  const onEffectLevelLineMouseDown = (e) => {
    e.preventDefault();

    let startX = {
      x: e.clientX,
    };

    let onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      const shift = {
        x: startX.x - moveEvt.clientX,
      };

      startX = {
        x: moveEvt.clientX,
      };

      const lineRange = effectLevelLine.getBoundingClientRect();
      const delta = startX.x - lineRange.left;

      const percent = ((delta / effectLevelLine.offsetWidth) * 100);

      window.effectLevelValue.value = percent;
      window.effectLevelValue.setAttribute(`value`, percent);

      window.effectLevelPin.style.left = `${window.effectLevelPin.offsetLeft - shift.x}px`;
      window.effectLevelDepth.style.width = `${percent}%`;

      switch (window.imagePreview.classList[1]) {
        case `effects__preview--chrome`:
          window.imagePreview.style.filter = `grayscale(${window.effectLevelValue.value / DEFAULT_VALUE})`;
          break;
        case `effects__preview--sepia`:
          window.imagePreview.style.filter = `sepia(${window.effectLevelValue.value / DEFAULT_VALUE})`;
          break;
        case `effects__preview--marvin`:
          window.imagePreview.style.filter = `invert(${window.effectLevelValue.value}%)`;
          break;
        case `effects__preview--phobos`:
          window.imagePreview.style.filter = `blur(${window.effectLevelValue.value * 0.03}px)`;
          break;
        case `effects__preview--heat`:
          window.imagePreview.style.filter = `brightness(${1 + window.effectLevelValue.value * 0.02})`;
          break;
        default:
          window.imagePreview.style.filter = ``;
          break;
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
