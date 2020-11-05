'use strict';

(() => {
  const DEFAULT_TRANSFORM_LEVEL = 100;
  const TRANSFORM_LEVEL_STEP = 25;

  const scaleControlSmaller = document.querySelector(`.scale__control--smaller`);
  const scaleControlBigger = document.querySelector(`.scale__control--bigger`);
  const scaleControlValue = document.querySelector(`.scale__control--value`);

  const resetScaleControlValue = () => {
    scaleControlValue.value = `100%`;
    scaleValue = parseInt(scaleControlValue.value, 10);
    window.imgUploadPreview.style.transform = `scale(1)`;
  };


  scaleControlValue.value = `${DEFAULT_TRANSFORM_LEVEL}%`;
  let scaleValue = parseInt(scaleControlValue.value, 10);

  const setScaleValue = (value) => {
    scaleControlValue.value = `${value}%`;
    window.imgUploadPreview.style.transform = `scale(${value / 100})`;
  };

  scaleControlSmaller.addEventListener(`click`, (e) => {
    e.preventDefault();

    if (scaleValue !== TRANSFORM_LEVEL_STEP && scaleValue <= DEFAULT_TRANSFORM_LEVEL) {
      scaleValue -= TRANSFORM_LEVEL_STEP;
    }
    setScaleValue(scaleValue);
  });

  scaleControlBigger.addEventListener(`click`, (e) => {
    e.preventDefault();

    if (scaleValue >= TRANSFORM_LEVEL_STEP && scaleValue < DEFAULT_TRANSFORM_LEVEL) {
      scaleValue += TRANSFORM_LEVEL_STEP;
    }
    setScaleValue(scaleValue);
  });

  window.zoom = {
    resetScaleControlValue,
  };

})();
