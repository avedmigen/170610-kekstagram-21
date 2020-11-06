'use strict';

(() => {
  const effectLevelValue = document.querySelector(`.effect-level__value`);
  const effectLevelPin = document.querySelector(`.effect-level__pin`);
  const effectLevelDepth = document.querySelector(`.effect-level__depth`);

  const resetSetupSettings = () => {

    window.scaleControlValue.value = `100%`;
    window.scaleValue = parseInt(window.scaleControlValue.value, 10);
    window.imgPreview.style.transform = `scale(1)`;

    window.imgPreview.className = `img-upload__preview`;
    window.imgPreview.style = ``;

    effectLevelValue.value = `100`;
    effectLevelPin.style.left = `100%`;
    effectLevelDepth.style.width = `100%`;

    window.originalEffect.checked = true;

    window.form.reset();
  };

  const onOpenForm = () => {
    window.previewContainer.classList.toggle(`hidden`);
    window.documentBody.classList.add(`modal-open`);

    resetSetupSettings();
  };

  const onCloseForm = () => {
    window.previewContainer.classList.toggle(`hidden`);
    window.documentBody.classList.remove(`modal-open`);

    resetSetupSettings();

  };

  window.reset = {
    onOpenForm,
    onCloseForm,
  };

})();
