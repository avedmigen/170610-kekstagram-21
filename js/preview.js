'use strict';
// 2. Редактирование изображения и ограничения, накладываемые на поля

(() => {

  const Key = {
    ESC: `Escape`,
    ENTER: `Enter`
  };

  window.previewContainer = document.querySelector(`.img-upload__overlay`);
  window.documentBody = document.querySelector(`body`);
  window.mainTag = document.querySelector(`main`);
  window.form = document.querySelector(`.img-upload__form`);
  const uploadFileInput = document.querySelector(`#upload-file`);
  const uploadCancelBtn = document.querySelector(`#upload-cancel`);
  window.imgPreview = window.previewContainer.querySelector(`.img-upload__preview`);
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

    window.imgPreview.className = `img-upload__preview`;
    window.imgPreview.classList.toggle(`effects__preview--${filter.value}`);
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
      console.log(`Форма отправлена`);
      window.success.renderMsg();

      document.addEventListener(`keydown`, onSuccessMessageEscKeyDown);
    }, () => {

      window.error.renderMsg();

      window.previewContainer.classList.add(`hidden`);
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

})();
