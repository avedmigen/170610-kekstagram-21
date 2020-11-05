'use strict';

(() => {
  const effectLevelValue = document.querySelector(`.effect-level__value`);
  const effectLevelPin = document.querySelector(`.effect-level__pin`);
  const effectLevelDepth = document.querySelector(`.effect-level__depth`);

  const onOpenForm = () => {
    window.uploadOverlay.classList.toggle(`hidden`);
    window.documentBody.classList.add(`modal-open`);

    window.scaleControlValue.value = `100%`;
    window.scaleValue = parseInt(window.scaleControlValue.value, 10);
    window.imgUploadPreview.style.transform = `scale(1)`;

    window.imgUploadPreview.className = `img-upload__preview`;
    window.imgUploadPreview.style = ``;

    effectLevelValue.value = `100`;
    effectLevelPin.style.left = `100%`;
    effectLevelDepth.style.width = `100%`;

    window.originalEffect.checked = true;

    window.form.reset();
  };
  const onCloseForm = () => {
    window.uploadOverlay.classList.toggle(`hidden`);
    window.documentBody.classList.remove(`modal-open`);

    window.scaleControlValue.value = `100%`;
    window.scaleValue = parseInt(window.scaleControlValue.value, 10);
    window.imgUploadPreview.style.transform = `scale(1)`;

    window.imgUploadPreview.className = `img-upload__preview`;
    window.imgUploadPreview.style = ``;

    effectLevelValue.value = `100`;
    effectLevelPin.style.left = `100%`;
    effectLevelDepth.style.width = `100%`;

    window.originalEffect.checked = true;

    window.form.reset();
  };

  window.reset = {
    onOpenForm,
    onCloseForm,
  };

})();
