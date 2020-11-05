'use strict';

(() => {
  const COMMENTS_LIMIT = 5;

  const renderBigPicture = (photo) => {
    // Найди контейнер бигпикчи
    const bigPic = document.querySelector(`.big-picture__preview`);
    const socialCommentsLoaderBtn = document.querySelector(`.social__comments-loader`);
    const socialCommentCount = document.querySelector(`.social__comment-count`);

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

    // Добавь на <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле.
    document.body.classList.add(`modal-open`);

    // Покажи бигпикчу
    const bigPicture = document.querySelector(`.big-picture`);
    bigPicture.classList.remove(`hidden`);

    // Закрой бигпикчу по клику по кресту
    const onBigPicCloseBtnClick = (e) => {
      e.preventDefault();
      window.commentCount = COMMENTS_LIMIT;

      if (socialCommentsLoaderBtn.classList.contains(`hidden`)) {
        socialCommentsLoaderBtn.classList.remove(`hidden`);
      }

      if (socialCommentCount.classList.contains(`hidden`)) {
        socialCommentCount.classList.remove(`hidden`);
      }

      document.querySelector(`.big-picture`).classList.add(`hidden`);
      document.removeEventListener(`click`, onBigPicCloseBtnClick);
    };

    const bigPicCloseBtn = document.querySelector(`.big-picture__cancel`);
    bigPicCloseBtn
      .addEventListener(`click`, onBigPicCloseBtnClick);
  };

  window.bigpicture = {
    renderBigPicture,
  };

})();
