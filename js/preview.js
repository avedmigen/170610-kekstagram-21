'use strict';
// 2. Редактирование изображения и ограничения, накладываемые на поля

(() => {

  const Key = {
    ESC: `Escape`,
    ENTER: `Enter`
  };

  window.uploadOverlay = document.querySelector(`.img-upload__overlay`);
  window.documentBody = document.querySelector(`body`);
  window.form = document.querySelector(`.img-upload__form`);
  const uploadFileInput = document.querySelector(`#upload-file`);
  const uploadCancelBtn = document.querySelector(`#upload-cancel`);
  window.imgUploadPreview = window.uploadOverlay.querySelector(`.img-upload__preview`);
  window.originalEffect = document.querySelector(`#effect-none`);
  const effectRadioInputs = document.querySelectorAll(`.effects__radio`);
  window.inputHashtags = document.querySelector(`.text__hashtags`);
  window.inputText = document.querySelector(`.text__description`);

  // Покажи модалку если пришёл файл с фоткой
  const onUploadFileInputChange = (e) => {
    e.preventDefault();

    window.reset.onOpenForm();

    document.addEventListener(`keydown`, onPopupEscKeyDown);
  };

  uploadFileInput.addEventListener(`change`, onUploadFileInputChange);

  // Скрой слайдер на эффекте Оригинал
  const slider = document.querySelector(`.img-upload__effect-level`);

  if (window.originalEffect.checked) {
    slider.classList.add(`hidden`);
  }

  // Примени эффект к превью
  const setPreviewEffect = (filter) => {

    window.imgUploadPreview.className = `img-upload__preview`;
    window.imgUploadPreview.classList.toggle(`effects__preview--${filter.value}`);
    window.saturation.reset(filter);

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

  effectRadioInputs.forEach((filter) => {
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
    e.preventDefault();

    window.backend.upload(() => {
      window.reset.onCloseForm();
      window.successmsg.renderMsg();
      document.addEventListener(`keydown`, onSuccessMessageEscKeyDown);
    }, () => {
      window.errormsg.renderMsg();
      document.addEventListener(`keydown`, onErrorMessageEscKeyDown);
    }, new FormData(window.form));

    window.form.removeEventListener(`submit`, onFormSubmit);
  };

  window.form.addEventListener(`submit`, onFormSubmit);

  // Закрой модалку превьюшки по клику на кнопку с крестом
  const onUploadCancelBtnClick = (e) => {
    e.preventDefault();
    window.reset.onCloseForm();
  };

  uploadCancelBtn.addEventListener(`click`, onUploadCancelBtnClick);

  // Закрой модалку по ESC

  const onPopupEscKeyDown = (e) => {
    if (e.code === Key.ESC) {
      e.preventDefault();
      window.reset.onCloseForm();
      document.removeEventListener(`keydown`, onPopupEscKeyDown);
    }
  };

  // Не закрывайся по ESC если комментарий в фокусе

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

  // Не закрывайся по ESC если хэштеги в фокусе

  window.preview = {
    overlay: window.uploadOverlay
  };

})();
