'use strict';

(() => {

  const renderMessage = () => {

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
      if (e.key === `Escape`) {
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
  };

  window.error = {
    renderMessage,
  };

})();
