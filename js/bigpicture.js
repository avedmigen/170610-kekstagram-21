'use strict';

(() => {
  const renderBigPicture = (photo) => {
    // Найди контейнер бигпикчи
    const bigPic = document.querySelector(`.big-picture__preview`);

    // Замени путь к файлу и альт бигпикчи
    const bigPicImg = bigPic.querySelector(`.big-picture__img > img`);
    bigPicImg.src = photo.url;
    bigPicImg.alt = photo.description;

    // Замени количество лайков
    const bigPicLikes = bigPic.querySelector(`.likes-count`);
    bigPicLikes.textContent = photo.likes;

    // Замени количество комментов
    const bigPicСommentsCount = bigPic.querySelector(`.comments-count`);
    bigPicСommentsCount.textContent = photo.comments.length;

    // Замени контент описания бигпикчи
    const bigPicDesc = bigPic.querySelector(`.social__caption`);
    bigPicDesc.textContent = photo.description;

    // Замени комменты
    window.comments.renderComments(photo);

    // Покажи бигпикчу
    const bigPicture = document.querySelector(`.big-picture`);
    bigPicture.classList.remove(`hidden`);

    // Закрой бигпикчу по клику по кресту
    const onBigPicCloseBtnClick = (e) => {
      e.preventDefault();
      document.querySelector(`.big-picture`).classList.add(`hidden`);
      document.removeEventListener(`click`, onBigPicCloseBtnClick);
    };

    const bigPicCloseBtn = document.querySelector(`.big-picture__cancel`);
    bigPicCloseBtn
      .addEventListener(`click`, onBigPicCloseBtnClick);

    // Закрой бигпикчу по клику по ESC
    const Key = {
      ESC: `Escape`,
      ENTER: `Enter`
    };

    const onBigPicEscKeyDown = (e) => {
      if (e.code === Key.ESC) {
        e.preventDefault();
        console.log(`onBigPicEscKeyDown`);
        document.removeEventListener(`keydown`, onBigPicEscKeyDown);
      }
    };

    bigPicture.addEventListener(`click`, onBigPicEscKeyDown);
  };

  window.bigpicture = {
    renderBigPicture,
  };

})();
