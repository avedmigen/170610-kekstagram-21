'use strict';
// 2. Редактирование изображения и ограничения, накладываемые на поля

(() => {

  const Key = {
    ESC: `Escape`,
    ENTER: `Enter`
  };

  const uploadOverlay = document.querySelector(`.img-upload__overlay`);
  const documentBody = document.querySelector(`body`);
  const uploadFileInput = document.querySelector(`#upload-file`);
  const uploadCancelBtn = document.querySelector(`#upload-cancel`);
  const userImgPreview = uploadOverlay.querySelector(`.img-upload__preview`);

  // Покажи модалку превьюшки если в поле пришёл файл с фоткой

  const onUploadFileInputChange = (e) => {
    e.preventDefault();
    uploadOverlay.classList.toggle(`hidden`);
    documentBody.classList.add(`modal-open`);

    document.addEventListener(`keydown`, onPopupEscKeyDown);
  };

  uploadFileInput.addEventListener(`change`, onUploadFileInputChange);

  // Выбери превьюшку с эффектом
  const effectsRadioInputs = document.querySelectorAll(`.effects__radio`);

  // Скрой слайдер на эффекте Оригинал
  const slider = document.querySelector(`.img-upload__effect-level`);
  const original = document.querySelector(`#effect-none`);

  if (original.checked) {
    slider.classList.add(`hidden`);
  }

  // Примени эффект к превью
  const setPreviewEffect = (filter) => {

    userImgPreview.className = `img-upload__preview`;
    userImgPreview.classList.toggle(`effects__preview--${filter.value}`);
    window.saturation.reset(filter);
    document.querySelector(`.effect-level__value`).value = `100`;
    document.querySelector(`.effect-level__pin`).style.left = `100%`;
    document.querySelector(`.effect-level__depth`).style.width = `100%`;
    // input поставить в 100
    // filter.checked = true;
  };

  const onFilterClick = (e, filter) => {

    if (filter.id !== `effect-none`) {
      slider.classList.remove(`hidden`);
    } else {
      slider.classList.add(`hidden`);
      filter.setAttribute(`checked`, ``);
    }

    setPreviewEffect(filter);

    document.removeEventListener(`click`, filter);
  };

  effectsRadioInputs.forEach((filter) => {
    filter.addEventListener(`click`, (e) => {
      onFilterClick(e, filter);
    });
  });

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

  // Отправь форму при сабмите
  const onFormSubmit = (e) => {
    console.log(`onFormSubmit`);

    e.preventDefault();
    window.backend.upload(() => {
      resetForm();
      window.successmsg.renderMsg();
      document.addEventListener(`keydown`, onSuccessMessageEscKeyDown);
    }, () => {
      window.errormsg.renderMsg();
      document.addEventListener(`keydown`, onErrorMessageEscKeyDown);
    }, new FormData(form));

    form.removeEventListener(`submit`, onFormSubmit);
  };

  const form = document.querySelector(`.img-upload__form`);
  form.addEventListener(`submit`, onFormSubmit);

  const resetForm = () => {
    uploadOverlay.classList.toggle(`hidden`);
    documentBody.classList.remove(`modal-open`);

    const scaleControlValue = document.querySelector(`.scale__control--value`);
    scaleControlValue.value = `100%`;

    form.reset();

    document.removeEventListener(`keydown`, onPopupEscKeyDown);
  };

  // Закрой модалку превьюшки по клику на кнопку с крестом
  const onUploadCancelBtnClick = (e) => {
    e.preventDefault();

    resetForm();
  };

  uploadCancelBtn.addEventListener(`click`, onUploadCancelBtnClick);

  const onPopupEscKeyDown = (e) => {
    if (e.code === Key.ESC) {
      e.preventDefault();
      resetForm();
    }
  };

  window.preview = {
    overlay: uploadOverlay
  };

})();
