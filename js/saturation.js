'use strict';

(() => {
  const userImgPreview = document.querySelector(`.img-upload__preview`);

  const reset = (filter) => {
    switch (filter.value) {
      case `chrome`:
        userImgPreview.style.filter = `grayscale(1)`;
        break;
      case `sepia`:
        userImgPreview.style.filter = `sepia(1)`;
        break;
      case `marvin`:
        userImgPreview.style.filter = `invert(100%)`;
        break;
      case `phobos`:
        userImgPreview.style.filter = `blur(3px)`;
        break;
      case `heat`:
        userImgPreview.style.filter = `brightness(3)`;
        break;
      default:
        userImgPreview.style.filter = ``;
        break;
    }
  };


  window.saturation = {
    reset,
  };

})();
