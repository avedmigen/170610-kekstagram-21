'use strict';

(() => {

  const renderBigPicture = (photo) => {

    const bigPicturePreview = document.querySelector(`.big-picture__preview`);


    const bigPictureImage = bigPicturePreview.querySelector(`.big-picture__img > img`);
    bigPictureImage.src = photo.url;
    bigPictureImage.alt = photo.description;


    const bigPictureLikesCount = bigPicturePreview.querySelector(`.likes-count`);
    bigPictureLikesCount.textContent = photo.likes;


    const bigPictureCommentCount = bigPicturePreview.querySelector(`.comments-count`);
    bigPictureCommentCount.textContent = photo.comments.length;


    const bigPictureDescription = bigPicturePreview.querySelector(`.social__caption`);
    bigPictureDescription.textContent = photo.description;


    window.comment.renderComments(photo.comments);


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

    const socialCommentsLoaderButton = document.querySelector(`.social__comments-loader`);
    const socialCommentCount = document.querySelector(`.social__comment-count`);

    if (socialCommentsLoaderButton.classList.contains(`hidden`)) {
      socialCommentsLoaderButton.classList.remove(`hidden`);
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
