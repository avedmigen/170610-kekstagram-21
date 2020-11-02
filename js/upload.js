'use strict';

(() => {
  const URL = `https://21.javascript.pages.academy/kekstagram`;

  window.upload = (data, onSucces) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      onSucces(xhr.response);
    });

    xhr.open(`POST`, URL);
    xhr.send(data);
  };
})();
