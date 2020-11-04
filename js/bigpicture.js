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

    // Замени контент комментов
    const bigPicСommentsList = bigPic.querySelector(`.social__comments`);
    const bigPicСomment = bigPicСommentsList.querySelector(`.social__comment`);

    // Замени контент описания бигпикчи
    const bigPicDesc = bigPic.querySelector(`.social__caption`);
    bigPicDesc.textContent = photo.description;

    // Покажи бигпикчу
    document.querySelector(`.big-picture`).classList.remove(`hidden`);

    console.log(`Бигпича отрендерена`);
  };

  window.bigpicture = {
    renderBigPicture,
  };

})();
