'use strict';

const apply = () => {
  const setPreviewEffect = (filter) => {
    window.imagePreview.classList.remove(window.imagePreview.classList[1]);
    window.imagePreview.classList.add(`effects__preview--${filter.value}`);
    window.saturation.reset(filter);
    window.effectLevelValue.setAttribute(`value`, `100`);
    document.querySelector(`.effect-level__pin`).style.left = `100%`;
    document.querySelector(`.effect-level__depth`).style.width = `100%`;
  };

  const onFilterClick = (e, filter) => {
    if (filter.id !== `effect-none`) {
      window.slider.classList.remove(`hidden`);
    } else {
      window.slider.classList.add(`hidden`);
      filter.setAttribute(`checked`, ``);
    }

    setPreviewEffect(filter);

    document.removeEventListener(`click`, filter);
  };

  window.effectRadioInputs.forEach((filter) => {
    filter.addEventListener(`click`, (e) => {
      onFilterClick(e, filter);
    });
  });
};

window.filter = {
  apply,
};
