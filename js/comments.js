'use strict';

(() => {

  const COMMENTS_LIMIT = 5;

  const renderComments = (data) => {

    const socialCommentsList = document.querySelector(`.social__comments`);
    const socialComment = document.querySelector(`.social__comment`);

    // Шаблон коммента для заполнения данными
    const commentTmpl = (num) => {
      let commentElement = socialComment.cloneNode(true);
      let commentAvatar = data.comments[num].avatar;
      let commentAlt = data.comments[num].name;
      let commentSocialText = data.comments[num].message;

      commentElement.querySelector(`.social__picture`).src = commentAvatar;
      commentElement.querySelector(`.social__picture`).alt = commentAlt;
      commentElement.querySelector(`.social__text`).textContent = commentSocialText;

      return commentElement;
    };

    // Приготовься добавлять комменты из полученных данных

    const drawComments = (limit) => {
      let fragment = document.createDocumentFragment();

      if (limit <= data.comments.length) {
        for (let i = 0; i < limit; i++) {
          fragment.appendChild(commentTmpl(i));
        }
      } else if (limit > data.comments.length) {
        for (let i = 0; i < data.comments.length; i++) {
          fragment.appendChild(commentTmpl(i));
          socialCommentsLoaderBtn.classList.add(`hidden`);
        }
      }

      while (socialCommentsList.firstChild) {
        socialCommentsList.removeChild(socialCommentsList.firstChild);
      }

      socialCommentsList.appendChild(fragment);
    };

    let commentCount = COMMENTS_LIMIT;
    drawComments(commentCount);

    // Загружай по +5 комментов по клику на кнопку Загрузить еще

    const socialCommentsLoaderBtn = document.querySelector(`.social__comments-loader`);

    const onSocialCommentsLoaderBtnClick = (e) => {
      e.preventDefault();
      commentCount += COMMENTS_LIMIT;
      drawComments(commentCount);
      document.removeEventListener(`click`, onSocialCommentsLoaderBtnClick);
    };

    socialCommentsLoaderBtn.addEventListener(`click`, onSocialCommentsLoaderBtnClick);

  };

  window.comments = {
    renderComments,
  };

})();
