'use strict';

(() => {

  const Key = {
    ESC: `Escape`,
    ENTER: `Enter`
  };

  window.documentBody = document.querySelector(`body`);
  window.mainTag = document.querySelector(`main`);

  window.form = document.querySelector(`.img-upload__form`);
  const uploadFileInput = window.form.querySelector(`#upload-file`);

  window.previewOverlay = document.querySelector(`.img-upload__overlay`);
  window.imagePreview = window.previewOverlay.querySelector(`.img-upload__preview`);
  const cancelButton = window.previewOverlay.querySelector(`#upload-cancel`);

  window.slider = window.previewOverlay.querySelector(`.img-upload__effect-level`);
  window.effectRadioInputs = window.previewOverlay.querySelectorAll(`.effects__radio`);
  window.effectNone = window.previewOverlay.querySelector(`#effect-none`);


  window.hashtagsInput = window.form.querySelector(`.text__hashtags`);
  window.textInput = window.form.querySelector(`.text__description`);


  // Покажи модалку если пришёл файл с фоткой
  const onUploadFileInputChange = () => {

    window.previewOverlay.classList.remove(`hidden`);
    window.documentBody.classList.add(`modal-open`);

    if (window.effectNone.hasAttribute(`checked`)) {
      window.slider.classList.add(`hidden`);
    }

    window.reset.resetFormSetupSettings();

    document.addEventListener(`keydown`, onPopupEscKeyDown);
  };

  uploadFileInput.addEventListener(`change`, onUploadFileInputChange);


  window.filter.apply();


  const onFormSubmit = (e) => {
    e.preventDefault();
    window.backend.upload(() => {

      window.previewOverlay.classList.add(`hidden`);
      window.documentBody.classList.add(`modal-open`);

      window.success.renderMessage();
      document.addEventListener(`keydown`, onSuccessMessageEscKeyDown);
      window.form.reset();

    }, () => {

      window.previewOverlay.classList.add(`hidden`);
      window.documentBody.classList.add(`modal-open`);

      window.error.renderMessage();
      document.addEventListener(`keydown`, onErrorMessageEscKeyDown);

    }, new FormData(window.form));

    window.form.reset();
  };

  window.form.addEventListener(`submit`, onFormSubmit);

  const onUploadCancelBtnClick = (e) => {
    e.preventDefault();

    window.previewOverlay.classList.add(`hidden`);
    window.documentBody.classList.add(`modal-open`);
    window.form.reset();
  };

  cancelButton.addEventListener(`click`, onUploadCancelBtnClick);

  const onPopupEscKeyDown = (e) => {
    if (e.code === Key.ESC) {
      e.preventDefault();

      window.previewOverlay.classList.add(`hidden`);
      window.documentBody.classList.add(`modal-open`);
      window.form.reset();
    }
  };


  const onInputFocus = () => {
    document.removeEventListener(`keydown`, onPopupEscKeyDown);
  };

  const onInputBlur = () => {
    document.addEventListener(`keydown`, onPopupEscKeyDown);
  };

  window.hashtagsInput.addEventListener(`focus`, onInputFocus);
  window.hashtagsInput.addEventListener(`blur`, onInputBlur);

  window.textInput.addEventListener(`focus`, onInputFocus);
  window.textInput.addEventListener(`blur`, onInputBlur);


  const closeRequestPopup = (id, handlerName) => {
    const popup = document.querySelector(`.${id}`);
    popup.remove();
    document.removeEventListener(`keydown`, handlerName);
  };

  const onSuccessMessageEscKeyDown = (e) => {
    if (e.code === Key.ESC) {
      e.preventDefault();
      closeRequestPopup(`success`, onSuccessMessageEscKeyDown);
    }
  };

  const onErrorMessageEscKeyDown = (e) => {
    if (e.code === Key.ESC) {
      e.preventDefault();
      closeRequestPopup(`error`, onErrorMessageEscKeyDown);
    }
  };

})();
