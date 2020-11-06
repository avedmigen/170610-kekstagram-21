'use strict';

(() => {

  const renderMsg = () => {

    const successTmpl = document.querySelector(`#success`)
      .content
      .querySelector(`.success`)
      .cloneNode(true);

    const onSuccessBtnClick = (e) => {
      e.preventDefault();
      successTmpl.remove();
      document.removeEventListener(`click`, onSuccessBtnClick);
    };

    const onsuccessOverlayClick = (e) => {
      e.preventDefault();
      if (e.target.classList.contains(`success`)) {
        successTmpl.remove();
        document.removeEventListener(`click`, onsuccessOverlayClick);
      }
    };

    const onsuccessOverlayKeydown = (e) => {
      e.preventDefault();
      if (e.target.classList.contains(`success`)) {
        successTmpl.remove();
      }
      document.removeEventListener(`keydown`, onsuccessOverlayKeydown);
    };

    const success = () => {
      let fragment = document.createDocumentFragment();
      fragment.appendChild(successTmpl);
      window.mainTag.appendChild(fragment);
      const successBtn = document.querySelector(`.success__button`);
      successBtn.addEventListener(`click`, onSuccessBtnClick);
      const successOverlay = document.querySelector(`.success`);
      successOverlay.addEventListener(`click`, onsuccessOverlayClick);
      successOverlay.addEventListener(`keydown`, onsuccessOverlayKeydown);
    };

    success();
  };

  window.success = {
    renderMsg,
  };

})();
