'use strict';
// 2. Редактирование изображения и ограничения, накладываемые на поля

(() => {

  const DEFAULT_DEPTH_LEVEL = 100;

  const Key = {
    ESC: `Escape`,
    ENTER: `Enter`
  };

  const documentBody = document.querySelector(`body`);
  const uploadFileInput = document.querySelector(`#upload-file`);
  const uploadCancelBtn = document.querySelector(`#upload-cancel`);
  const uploadOverlay = document.querySelector(`.img-upload__overlay`);

  // Использовать для отладки и потом убрать
  // uploadOverlay.classList.toggle(`hidden`);

  // Покажи модалку превьюшки если в поле пришёл файл с фоткой

  const onUploadFileInputChange = (e) => {
    e.preventDefault();
    uploadOverlay.classList.toggle(`hidden`);
    documentBody.classList.add(`modal-open`);

    document.addEventListener(`keydown`, onPopupEscKeyDown);
  };

  uploadFileInput.addEventListener(`change`, onUploadFileInputChange);

  // Закрой модалку превьюшки по клику на кнопку с крестом
  uploadCancelBtn.addEventListener(`click`, (e) => {
    e.preventDefault();

    uploadOverlay.classList.toggle(`hidden`);
    documentBody.classList.remove(`modal-open`);
    uploadFileInput.value = null;

    document.removeEventListener(`keydown`, onPopupEscKeyDown);
  });

  const onPopupEscKeyDown = (e) => {
    if (e.code === Key.ESC) {
      e.preventDefault();
      uploadOverlay.classList.toggle(`hidden`);
      documentBody.classList.remove(`modal-open`);
      uploadFileInput.value = null;

      document.removeEventListener(`keydown`, onPopupEscKeyDown);
    }
  };

  window.zoom.setup();
  window.filters.setup();

  const imgUploadPreview = document.querySelector(`.img-upload__preview`);
  const effectLevelValue = document.querySelector(`.effect-level__value`);
  const effectLevelPin = document.querySelector(`.effect-level__pin`);
  const effectLevelDepth = document.querySelector(`.effect-level__depth`);


  // Выбери превьюшку с эффектом
  const effectsPreviews = document.querySelectorAll(`.effects__item`);
  const effectsRadioInputs = document.querySelectorAll(`.effects__radio`);

  const setCheckedAttr = (filter) => {
    effectsRadioInputs.forEach((input) => {
      if (input) {
        input.removeAttribute(`checked`);
      }

      filter.setAttribute(`checked`, ``);
    });
  };

  const onFilterClick = (e, filter) => {
    e.preventDefault();
    setCheckedAttr(filter);
  };

  effectsRadioInputs.forEach((filter) => {
    filter.addEventListener(`click`, (e) => {
      onFilterClick(e, filter);
    });
  });


  // Скрой слайдер на эффекте Оригинал
/*  const slider = document.querySelector(`.img-upload__effect-level`);
  for (let item of effectsRadioInput) {
    if (item.id === `effect-none` && item.hasAttribute(`checked`)) {
      slider.classList.add(`hidden`);
    }
  }*/

  // Приготовься показать слайдер если не выбран эффект Оригинал
/*  const showSlider = (item) => {
    if (item.querySelector(`input`).id !== `effect-none`) {
      slider.classList.remove(`hidden`);
    } else {
      slider.classList.add(`hidden`);
    }
  };*/

  /*for (let item of effectsPreviews ) {
    item.addEventListener(`click`, (e) => {
      e.preventDefault();
      /!*unsetCheckedAttr(item);*!/
      item.querySelector(`input`).checked = true;
      showSlider(item);
      effectLevelValue.value = null;
      effectLevelPin.style.left = `${DEFAULT_DEPTH_LEVEL}%`;
      effectLevelDepth.style.width = `${DEFAULT_DEPTH_LEVEL}%`;
      let effectClassName = `effects__preview--${item.childNodes[1].value}`;
      imgUploadPreview.classList.remove(imgUploadPreview.classList[1]);
      imgUploadPreview.classList.add(effectClassName);
      imgUploadPreview.style.filter = ``;
    });

    item.addEventListener(`keydown`, (e) => {
      if (e.code === `Enter`) {
        e.preventDefault();
        effectLevelValue.value = null;
        effectLevelPin.style.left = `${DEFAULT_DEPTH_LEVEL}%`;
        effectLevelDepth.style.width = `${DEFAULT_DEPTH_LEVEL}%`;
        let effectClassName = `effects__preview--${item.childNodes[1].value}`;
        imgUploadPreview.classList.remove(imgUploadPreview.classList[1]);
        imgUploadPreview.classList.add(effectClassName);
        imgUploadPreview.style.filter = ``;
      }
    });
  }*/

  // Так отправляй форму на сервер
  const form = document.querySelector(`.img-upload__form`);
  form.addEventListener(`submit`, (e) => {
    window.backend.upload(() => {
      uploadOverlay.classList.toggle(`hidden`);
      window.successmsg.renderMsg();
    }, () => {
      uploadOverlay.classList.toggle(`hidden`);
      window.errormsg.renderMsg();
    }, new FormData(form));
    e.preventDefault();
  });

})();
