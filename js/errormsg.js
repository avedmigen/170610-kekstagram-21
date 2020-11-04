'use strict';

(() => {

  const renderMsg = () => {
    // Тут покажешь информационное сообщение после отправки формы
    const mainTarget = document.querySelector(`main`);

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

    const onErrorMsgOverleyClick = (e) => {
      e.preventDefault();
      if (e.target.classList.contains(`error`)) {
        errorTmpl.remove();
      }
      document.removeEventListener(`click`, onErrorMsgOverleyClick);
    };

    const onErrorMsgOverleyKeydown = (e) => {
      e.preventDefault();
      if (e.target.classList.contains(`error`)) {
        errorTmpl.remove();
      }
      document.removeEventListener(`keydown`, onErrorMsgOverleyKeydown);
    };

    const errorMsg = () => {
      let fragment = document.createDocumentFragment();
      fragment.appendChild(errorTmpl);
      mainTarget.appendChild(fragment);
      const errorBtn = document.querySelector(`.error__button`);
      errorBtn.addEventListener(`click`, onErrorBtnClick);
      const errorMsgOverley = document.querySelector(`.error`);
      errorMsgOverley.addEventListener(`click`, onErrorMsgOverleyClick);
      errorMsgOverley.addEventListener(`keydown`, onErrorMsgOverleyKeydown);
    };

    errorMsg();
  };

  window.errormsg = {
    renderMsg,
  };

})();
