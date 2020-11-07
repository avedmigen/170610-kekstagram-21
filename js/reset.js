'use strict';

(() => {

  const resetFormSetupSettings = () => {

    window.scaleControlValue.value = `100%`;
    window.scaleValue = parseInt(window.scaleControlValue.value, 10);
    window.imagePreview.style.transform = `scale(1)`;

    window.imagePreview.className = `img-upload__preview`;
    window.imagePreview.style = ``;

    window.effectLevelValue.setAttribute(`value`, `100`);
    window.effectLevelPin.style.left = `100%`;
    window.effectLevelDepth.style.width = `100%`;

    window.effectNone.checked = true;

  };

  window.reset = {
    resetFormSetupSettings,
  };

})();
