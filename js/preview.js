'use strict';
// 2. Редактирование изображения и ограничения, накладываемые на поля

(() => {

  const Key = {
    ESC: `Escape`,
    ENTER: `Enter`
  };

  const documentBody = document.querySelector(`body`);
  const uploadFileInput = document.querySelector(`#upload-file`);
  const uploadCancelBtn = document.querySelector(`#upload-cancel`);
  const uploadOverlay = document.querySelector(`.img-upload__overlay`);

  // Использовать для отладки и потом убрать
  /* uploadOverlay.classList.toggle(`hidden`);*/

  // Покажи модалку превьюшки если в поле пришёл файл с фоткой

  const onUploadFileInputChange = (e) => {
    e.preventDefault();
    uploadOverlay.classList.toggle(`hidden`);
    documentBody.classList.add(`modal-open`);

    document.addEventListener(`keydown`, onPopupEscKeyDown);
  };

  uploadFileInput.addEventListener(`change`, onUploadFileInputChange);

  window.zoom.setup();
  window.slider.setup();

  // Выбери превьюшку с эффектом
  const effectsRadioInputs = document.querySelectorAll(`.effects__radio`);

  // Скрой слайдер на эффекте Оригинал
  const slider = document.querySelector(`.img-upload__effect-level`);
  const original = document.querySelector(`#effect-none`);

  if (original.hasAttribute(`checked`)) {
    slider.classList.add(`hidden`);
  }

  // Примени эффект к превьюшке
  const setPreviewEffect = (filter) => {
    const userImgPreview = document.querySelector(`.img-upload__preview`);
    userImgPreview.className = `img-upload__preview`;
    userImgPreview.classList.toggle(`effects__preview--${filter.value}`);
    document.querySelector(`.effect-level__value`).value = `100`;
    document.querySelector(`.effect-level__pin`).style.left = `100%`;
    document.querySelector(`.effect-level__depth`).style.width = `100%`;
  };

  const onFilterClick = (e, filter) => {
    e.preventDefault();

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

  // Отправь форму при сабмите

  const onFormSubmit = (e) => {
    e.preventDefault();
    window.backend.upload(() => {
      uploadOverlay.classList.toggle(`hidden`);
      window.successmsg.renderMsg();
    }, () => {
      uploadOverlay.classList.toggle(`hidden`);
      window.errormsg.renderMsg();
    }, new FormData(form));
    form.reset();
    document.removeEventListener(`submit`, onFormSubmit);
  };

  const form = document.querySelector(`.img-upload__form`);
  form.addEventListener(`submit`, onFormSubmit);

  // Закрой модалку превьюшки по клику на кнопку с крестом
  const onUploadCancelBtnClick = (e) => {
    e.preventDefault();

    uploadOverlay.classList.toggle(`hidden`);
    documentBody.classList.remove(`modal-open`);
    uploadFileInput.value = null;

    form.reset();

    document.removeEventListener(`keydown`, onPopupEscKeyDown);
  };

  uploadCancelBtn.addEventListener(`click`, onUploadCancelBtnClick);

  const onPopupEscKeyDown = (e) => {
    if (e.code === Key.ESC) {
      e.preventDefault();
      uploadOverlay.classList.toggle(`hidden`);
      documentBody.classList.remove(`modal-open`);

      const scaleControlValue = document.querySelector(`.scale__control--value`);
      scaleControlValue.value = `100%`;

      form.reset();

      document.removeEventListener(`keydown`, onPopupEscKeyDown);
    }
  };

})();
