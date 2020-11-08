'use strict';

(() => {

  const Key = {
    ESC: `Escape`,
  };

  const render = (result) => {

    if (result === `success`) {

      const successTemplate = document.querySelector(`#success`)
        .content
        .querySelector(`.success`)
        .cloneNode(true);

      const onSuccessButtonClick = (e) => {
        e.preventDefault();
        successTemplate.remove();
        document.removeEventListener(`click`, onSuccessButtonClick);
      };

      const onSuccessOverlayClick = (e) => {
        e.preventDefault();
        if (e.target.classList.contains(`success`)) {
          successTemplate.remove();
          document.removeEventListener(`click`, onSuccessOverlayClick);
        }
      };

      const onSuccessOverlayKeydown = (e) => {
        if (e.code === Key.ESC) {
          e.preventDefault();
          if (e.target.classList.contains(`success`)) {
            successTemplate.remove();
          }
          document.removeEventListener(`keydown`, onSuccessOverlayKeydown);
        }
      };

      const success = () => {
        let fragment = document.createDocumentFragment();
        fragment.appendChild(successTemplate);
        window.mainTag.appendChild(fragment);
        const successBtn = document.querySelector(`.success__button`);
        successBtn.addEventListener(`click`, onSuccessButtonClick);
        const successOverlay = document.querySelector(`.success`);
        successOverlay.addEventListener(`click`, onSuccessOverlayClick);
        successOverlay.addEventListener(`keydown`, onSuccessOverlayKeydown);
      };

      success();

    } else {

      const errorTemplate = document.querySelector(`#error`)
        .content
        .querySelector(`.error`)
        .cloneNode(true);

      const onErrorButtonClick = (e) => {
        e.preventDefault();
        errorTemplate.remove();
        document.removeEventListener(`click`, onErrorButtonClick);
      };

      const onErrorOverlayClick = (e) => {
        e.preventDefault();
        if (e.target.classList.contains(`error`)) {
          errorTemplate.remove();
        }
        document.removeEventListener(`click`, onErrorOverlayClick);
      };

      const onerrorOverlayKeydown = (e) => {
        if (e.code === Key.ESC) {
          e.preventDefault();
          if (e.target.classList.contains(`error`)) {
            errorTemplate.remove();
          }
          document.removeEventListener(`keydown`, onerrorOverlayKeydown);
        }
      };

      const error = () => {
        let fragment = document.createDocumentFragment();
        fragment.appendChild(errorTemplate);
        window.mainTag.appendChild(fragment);
        const errorButton = document.querySelector(`.error__button`);
        errorButton.addEventListener(`click`, onErrorButtonClick);
        const errorOverlay = document.querySelector(`.error`);
        errorOverlay.addEventListener(`click`, onErrorOverlayClick);
        errorOverlay.addEventListener(`keydown`, onerrorOverlayKeydown);
      };

      error();
    }

  };

  window.message = {
    render,
  };

})();
