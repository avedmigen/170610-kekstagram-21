'use strict';

const DEFAULT_TRANSFORM_LEVEL = 100;
const TRANSFORM_LEVEL_STEP = 25;

const scaleControlSmaller = window.form.querySelector(
  `.scale__control--smaller`
);
const scaleControlBigger = window.form.querySelector(`.scale__control--bigger`);
window.scaleControlValue = window.form.querySelector(`.scale__control--value`);

window.scaleControlValue.value = `${DEFAULT_TRANSFORM_LEVEL}%`;
window.scaleValue = parseInt(window.scaleControlValue.value, 10);

const setScaleValue = (value) => {
  window.scaleControlValue.value = `${value}%`;
  window.imagePreview.style.transform = `scale(${value / 100})`;
};

scaleControlSmaller.addEventListener(`click`, (e) => {
  e.preventDefault();

  if (
    window.scaleValue !== TRANSFORM_LEVEL_STEP &&
    window.scaleValue <= DEFAULT_TRANSFORM_LEVEL
  ) {
    window.scaleValue -= TRANSFORM_LEVEL_STEP;
  }
  setScaleValue(window.scaleValue);
});

scaleControlBigger.addEventListener(`click`, (e) => {
  e.preventDefault();

  if (
    window.scaleValue >= TRANSFORM_LEVEL_STEP &&
    window.scaleValue < DEFAULT_TRANSFORM_LEVEL
  ) {
    window.scaleValue += TRANSFORM_LEVEL_STEP;
  }
  setScaleValue(window.scaleValue);
});
