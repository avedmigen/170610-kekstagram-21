'use strict';

(() => {

  const renderMsg = () => {
    // Тут покажешь информационное сообщение после отправки формы
    const mainTarget = document.querySelector(`main`);

    // Подготовь шаблон сообщения об успешной загрузке изображения
    const successTmpl = document.querySelector(`#success`)
      .content
      .querySelector(`.success`)
      .cloneNode(true);

    const onSuccessBtnClick = (e) => {
      e.preventDefault();
      successTmpl.remove();
    };

    const onSuccessMsgOverleyClick = (e) => {
      e.preventDefault();
      if (e.target.classList.contains(`success`)) {
        successTmpl.remove();
      }
    };

    const onSuccessMsgOverleyKeydown = (e) => {
      e.preventDefault();
      if (e.target.classList.contains(`success`)) {
        successTmpl.remove();
      }
    };

    const successMsg = () => {
      let fragment = document.createDocumentFragment();
      fragment.appendChild(successTmpl);
      mainTarget.appendChild(fragment);
      const successBtn = document.querySelector(`.success__button`);
      successBtn.addEventListener(`click`, onSuccessBtnClick);
      const successMsgOverley = document.querySelector(`.success`);
      successMsgOverley.addEventListener(`click`, onSuccessMsgOverleyClick);
      successMsgOverley.addEventListener(`keydown`, onSuccessMsgOverleyKeydown);
    };

    successMsg();
  };

  window.successmsg = {
    renderMsg,
  };

})();
