'use strict';

const STATUS_CODE = {
  OK: 200
};
const TIMEOUT_IN_MS = 10000;

const Url = {
  LOAD: `https://21.javascript.pages.academy/kekstagram/data`,
  UPLOAD: `https://21.javascript.pages.academy/kekstagram`
};

const request = (onSuccess, onError, data) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === STATUS_CODE.OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });

  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ${xhr.timeout} мс.`);
  });

  xhr.timeout = TIMEOUT_IN_MS;

  if (data) {
    xhr.open(`POST`, Url.UPLOAD);
    xhr.send(data);
  } else {
    xhr.open(`GET`, Url.LOAD);
    xhr.send();
  }
};

window.backend = {
  load: request,
  upload: request
};
