'use strict';

(() => {

  const Key = {
    ESC: `Escape`,
  };

  const renderMessage = () => {

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
  };

  window.success = {
    renderMessage,
  };

})();
