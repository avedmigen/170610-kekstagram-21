'use strict';

(() => {

  const renderBigPicture = (photo) => {

    const bigPic = document.querySelector(`.big-picture__preview`);


    const bigPicImg = bigPic.querySelector(`.big-picture__img > img`);
    bigPicImg.src = photo.url;
    bigPicImg.alt = photo.description;


    const bigPicLikes = bigPic.querySelector(`.likes-count`);
    bigPicLikes.textContent = photo.likes;


    const bigPicCommentCount = bigPic.querySelector(`.comments-count`);
    bigPicCommentCount.textContent = photo.comments.length;


    const bigPicDesc = bigPic.querySelector(`.social__caption`);
    bigPicDesc.textContent = photo.description;


    window.comments.renderComments(photo.comments);


    document.body.classList.add(`modal-open`);


    const bigPicture = document.querySelector(`.big-picture`);
    bigPicture.classList.remove(`hidden`);


    const onBigPicCloseBtnClick = (e) => {
      e.preventDefault();
      window.bigpicture.onCloseClearData();
      bigPicCloseBtn.removeEventListener(`click`, onBigPicCloseBtnClick);
    };

    const bigPicCloseBtn = document.querySelector(`.big-picture__cancel`);
    bigPicCloseBtn.addEventListener(`click`, onBigPicCloseBtnClick);
  };

  const onCloseClearData = () => {
    document.body.classList.remove(`modal-open`);

    const socialCommentsLoaderBtn = document.querySelector(`.social__comments-loader`);
    const socialCommentCount = document.querySelector(`.social__comment-count`);

    if (socialCommentsLoaderBtn.classList.contains(`hidden`)) {
      socialCommentsLoaderBtn.classList.remove(`hidden`);
    }

    if (socialCommentCount.classList.contains(`hidden`)) {
      socialCommentCount.classList.remove(`hidden`);
    }

    document.querySelector(`.big-picture`).classList.add(`hidden`);
  };

  window.bigpicture = {
    renderBigPicture,
    onCloseClearData,
  };

})();
