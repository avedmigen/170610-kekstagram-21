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
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  // Экспортируй утилиты
  window.utils = {
    getRenderedPhotos,
    removeRenderedPhotos,
    setDebounce,
    shuffleArray,
  };

})();
