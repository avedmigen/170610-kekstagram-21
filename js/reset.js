'use strict';

(() => {

  const DEFAULT_VALUE = 100;

  const setup = () => {

    window.scaleControlValue.value = `100%`;
    window.scaleValue = parseInt(window.scaleControlValue.value, 10);
    window.imagePreview.style.transform = `scale(1)`;

    window.imagePreview.classList.add(`img-upload__preview`);
    window.imagePreview.classList.remove(window.imagePreview.classList[1]);
    window.imagePreview.style = ``;

    window.effectLevelValue.value = DEFAULT_VALUE;
    window.effectLevelValue.setAttribute(`value`, `${DEFAULT_VALUE}`);
    window.effectLevelPin.style.left = `100%`;
    window.effectLevelDepth.style.width = `100%`;

    window.effectNone.checked = true;

  };

  window.reset = {
    setup,
  };

})();
