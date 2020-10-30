'use strict';

(() => {

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

  // Перемешай массив с ограничение по кол-ву элементов
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  // Экспортируй утилиты
  window.utils = {
    getRenderedPhotos,
    removeRenderedPhotos,
    setDebounce,
    shuffleArray,
  };

})();
