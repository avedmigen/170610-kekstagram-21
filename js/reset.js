'use strict';

(() => {

  const resetFormSetupSettings = () => {

    window.scaleControlValue.value = `100%`;
    window.scaleValue = parseInt(window.scaleControlValue.value, 10);
    window.imgPreview.style.transform = `scale(1)`;

    window.imgPreview.className = `img-upload__preview`;
    window.imgPreview.style = ``;

    window.effectLevelValue.setAttribute(`value`, `100`);
    window.effectLevelPin.style.left = `100%`;
    window.effectLevelDepth.style.width = `100%`;

    window.effectNone.checked = true;

    console.log(`настройки формы сброшены`);
  };

  window.reset = {
    formSettings: resetFormSetupSettings,
  };

})();
