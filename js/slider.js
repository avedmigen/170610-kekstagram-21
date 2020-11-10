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

    const lineRange = effectLevelLine.getBoundingClientRect();
    const lineWidth = effectLevelLine.offsetWidth;

    let onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      startX = {
        x: moveEvt.clientX,
      };

      let delta = startX.x - lineRange.left;

      if (delta < 0) {
        delta = 0;
      } else if (delta > lineWidth) {
        delta = lineWidth;
      }

      const attributeValue = ((delta / lineWidth) * DEFAULT_VALUE);

      window.effectLevelValue.value = parseInt(attributeValue, 10);
      window.effectLevelValue.setAttribute(`value`, `${parseInt(attributeValue, 10)}`);

      window.effectLevelPin.style.left = `${delta}px`;
      window.effectLevelDepth.style.width = `${attributeValue}%`;

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
