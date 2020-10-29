'use strict';

(() => {

  // Сгенерируй рандомное число из диапазона
  const getMinMaxRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Найди все фотки на странице

  const getRenderedPhotos = () => {
    const renderedPhotos = document.querySelectorAll(`.picture`);
    return renderedPhotos;
  };

  // Удали все фотки на странице

  const removeRenderedPhotos = () => {
    const renderedPhotos = document.querySelectorAll(`.picture`);
    for (let photo of renderedPhotos) {
      photo.remove();
    }
  };

  // Удали дребезг

  let lastTimeout;

  const setDebounce = (drawphotos, dbinterval) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(drawphotos, dbinterval);
  };

  // Экспортируй утилиты

  window.utils = {
    getMinMaxRandomNumber,
    getRenderedPhotos,
    removeRenderedPhotos,
    setDebounce,
  };

})();
