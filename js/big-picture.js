'use strict';

(() => {
  window.load((photos) => {
    const cleanDataPhotos = photos.slice();

    const pictures = document.querySelectorAll(`.picture`);
    const bigPicContainer = document.querySelector(`.big-picture`);
    let isBigPicOpened = false;

    // Слушай клики на превьюшках и открывай модалки
    if (pictures) {
      for (let picture of pictures) {
        picture.addEventListener(`click`, (e) => {
          e.preventDefault();
          bigPicContainer.classList.remove('hidden');
          isBigPicOpened = true;

          if (isBigPicOpened) {
            const bigPicPreview = document.querySelector(`.big-picture__preview`);
            console.log(bigPicPreview);
          }
        });
      }
    }

    // Закрой попап по клику на кнопке с крестом
    const bigPictureCancel = document.querySelector(`.big-picture__cancel`);
    bigPictureCancel.addEventListener(`click`, (e) => {
      e.preventDefault();
      bigPicContainer.classList.add('hidden');
    });
  });
})();
