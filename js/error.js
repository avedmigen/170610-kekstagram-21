'use strict';

(() => {

  const renderMsg = () => {
    // Подготовь шаблон сообщения о неуспешной загрузке изображения
    const errorTmpl = document.querySelector(`#error`)
      .content
      .querySelector(`.error`)
      .cloneNode(true);

    const onErrorBtnClick = (e) => {
      e.preventDefault();
      errorTmpl.remove();
      document.removeEventListener(`click`, onErrorBtnClick);
    };

    const onerrorOverlayClick = (e) => {
      e.preventDefault();
      if (e.target.classList.contains(`error`)) {
        errorTmpl.remove();
      }
      document.removeEventListener(`click`, onerrorOverlayClick);
    };

    const onerrorOverlayKeydown = (e) => {
      if (e.key === `Escape`) {
        e.preventDefault();
        if (e.target.classList.contains(`error`)) {
          errorTmpl.remove();
        }
        document.removeEventListener(`keydown`, onerrorOverlayKeydown);
      }
    };

    const error = () => {
      let fragment = document.createDocumentFragment();
      fragment.appendChild(errorTmpl);
      window.mainTag.appendChild(fragment);
      const errorBtn = document.querySelector(`.error__button`);
      errorBtn.addEventListener(`click`, onErrorBtnClick);
      const errorOverlay = document.querySelector(`.error`);
      errorOverlay.addEventListener(`click`, onerrorOverlayClick);
      errorOverlay.addEventListener(`keydown`, onerrorOverlayKeydown);
    };

    error();
  };

  window.error = {
    renderMsg,
  };

})();
