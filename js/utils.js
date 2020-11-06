'use strict';

(() => {


  const getRenderedPhotos = () => {
    const renderedPhotos = document.querySelectorAll(`.picture`);
    return renderedPhotos;
  };


  const removeRenderedPhotos = () => {
    const renderedPhotos = document.querySelectorAll(`.picture`);
    renderedPhotos.forEach((photo) => {
      photo.remove();
    });
  };


  let lastTimeout;

  const setDebounce = (drawphotos, dbinterval) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(drawphotos, dbinterval);
  };


  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };


  const drawErrorRedBorder = (invalidMessageArr, inputField) => {
    if (invalidMessageArr.length !== 0) {
      inputField.style.outlineColor = `red`;
    } else {
      inputField.style.outlineColor = ``;
    }
  };


  window.utils = {
    getRenderedPhotos,
    removeRenderedPhotos,
    setDebounce,
    shuffleArray,
    drawErrorRedBorder,
  };

})();
