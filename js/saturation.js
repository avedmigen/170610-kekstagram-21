'use strict';

(() => {

  const reset = (filter) => {
    switch (filter.value) {
      case `chrome`:
        window.imgPreview.style.filter = `grayscale(1)`;
        break;
      case `sepia`:
        window.imgPreview.style.filter = `sepia(1)`;
        break;
      case `marvin`:
        window.imgPreview.style.filter = `invert(100%)`;
        break;
      case `phobos`:
        window.imgPreview.style.filter = `blur(3px)`;
        break;
      case `heat`:
        window.imgPreview.style.filter = `brightness(3)`;
        break;
      default:
        window.imgPreview.style.filter = ``;
        break;
    }
  };


  window.saturation = {
    reset,
  };

})();
