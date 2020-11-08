'use strict';

(() => {

  const DEFAULT_VALUE = 100;

  const apply = () => {

    const setPreviewEffect = (filter) => {

      window.imagePreview.className = `img-upload__preview`;
      window.imagePreview.classList.toggle(`effects__preview--${filter.value}`);
      window.saturation.reset(filter);

      window.effectLevelValue.value = DEFAULT_VALUE;
      window.effectLevelValue.setAttribute(`value`, `${DEFAULT_VALUE}`);
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

})();
