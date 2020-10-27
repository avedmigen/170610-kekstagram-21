'use strict';

// Вызовы методов других модулей или код, который необходим для работы других модулей

(() => {

  // 1. Получи демо-данные с сервера

  // 2. Загрузка нового изображения на сайт и заполнение информации о нём
  const documentBody = document.querySelector(`body`);
  const uploadFileInput = document.querySelector(`#upload-file`);
  const uploadCancelBtn = document.querySelector(`#upload-cancel`);
  const uploadOverlay = document.querySelector(`.img-upload__overlay`);

  // Использовать для отладки и потом убрать
  /*  uploadOverlay.classList.toggle(`hidden`);*/

  uploadFileInput.onchange = (e) => {
    e.preventDefault();
    uploadOverlay.classList.toggle(`hidden`);
    documentBody.classList.add(`modal-open`);
  };

  uploadCancelBtn.addEventListener(`click`, (e) => {
    e.preventDefault();
    uploadOverlay.classList.toggle(`hidden`);
    documentBody.classList.remove(`modal-open`);
    uploadFileInput.value = null;
  });

  window.addEventListener(`keydown`, (e) => {
    if (e.code === `Escape`) {
      e.preventDefault();
      uploadOverlay.classList.toggle(`hidden`);
      documentBody.classList.remove(`modal-open`);
      uploadFileInput.value = null;
    }
  });

})();
