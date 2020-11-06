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
  window.imgPreview = window.previewOverlay.querySelector(`.img-upload__preview`);
  const cancelBtn = window.previewOverlay.querySelector(`#upload-cancel`);

  window.slider = window.previewOverlay.querySelector(`.img-upload__effect-level`);
  window.effectRadioInputs = window.previewOverlay.querySelectorAll(`.effects__radio`);
  window.effectNone = window.previewOverlay.querySelector(`#effect-none`);


  window.inputHashtags = window.form.querySelector(`.text__hashtags`);
  window.inputText = window.form.querySelector(`.text__description`);


  // Покажи модалку если пришёл файл с фоткой
  const onUploadFileInputChange = () => {

    window.previewOverlay.classList.remove(`hidden`);
    window.documentBody.classList.add(`modal-open`);

    if (window.effectNone.hasAttribute(`checked`)) {
      window.slider.classList.add(`hidden`);
    }

    window.reset.formSettings();

    document.addEventListener(`keydown`, onPopupEscKeyDown);
  };

  uploadFileInput.addEventListener(`change`, onUploadFileInputChange);


  window.filter.apply();


  const onFormSubmit = (e) => {
    e.preventDefault();
    window.backend.upload(() => {

      window.previewOverlay.classList.add(`hidden`);
      window.documentBody.classList.add(`modal-open`);

      window.success.renderMsg();
      document.addEventListener(`keydown`, onSuccessMessageEscKeyDown);
      window.form.reset();

    }, () => {

      window.previewOverlay.classList.add(`hidden`);
      window.documentBody.classList.add(`modal-open`);

      window.error.renderMsg();
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

  cancelBtn.addEventListener(`click`, onUploadCancelBtnClick);

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

  window.inputHashtags.addEventListener(`focus`, onInputFocus);
  window.inputHashtags.addEventListener(`blur`, onInputBlur);

  window.inputText.addEventListener(`focus`, onInputFocus);
  window.inputText.addEventListener(`blur`, onInputBlur);


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
