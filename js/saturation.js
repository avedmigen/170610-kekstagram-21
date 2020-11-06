'use strict';

(() => {

  const reset = (filter) => {
    switch (filter.value) {
      case `chrome`:
        window.imagePreview.style.filter = `grayscale(1)`;
        break;
      case `sepia`:
        window.imagePreview.style.filter = `sepia(1)`;
        break;
      case `marvin`:
        window.imagePreview.style.filter = `invert(100%)`;
        break;
      case `phobos`:
        window.imagePreview.style.filter = `blur(3px)`;
        break;
      case `heat`:
        window.imagePreview.style.filter = `brightness(3)`;
        break;
      default:
        window.imagePreview.style.filter = ``;
        break;
    }
  };


  window.saturation = {
    reset,
  };

})();
