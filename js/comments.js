'use strict';

(() => {

  const COMMENTS_LIMIT = 5;

  const renderComments = (data) => {

    const socialCommentsList = document.querySelector(`.social__comments`);
    const socialComment = document.querySelector(`.social__comment`);
    const socialCommentCount = document.querySelector(`.social__comment-count`);
    const socialCommentsLoaderBtn = document.querySelector(`.social__comments-loader`);


    const commentTmpl = (num) => {
      let commentElement = socialComment.cloneNode(true);
      let commentAvatar = data[num].avatar;
      let commentAlt = data[num].name;
      let commentSocialText = data[num].message;

      commentElement.querySelector(`.social__picture`).src = commentAvatar;
      commentElement.querySelector(`.social__picture`).alt = commentAlt;
      commentElement.querySelector(`.social__text`).textContent = commentSocialText;

      return commentElement;
    };


    const drawComments = (limit) => {
      let fragment = document.createDocumentFragment();

      socialCommentCount.firstChild.textContent = `${limit} из `;

      if (limit <= data.length) {
        for (let i = 0; i < limit; i++) {
          fragment.appendChild(commentTmpl(i));
        }
      } else if (limit > data.length) {
        for (let i = 0; i < data.length; i++) {
          fragment.appendChild(commentTmpl(i));
          socialCommentsLoaderBtn.classList.add(`hidden`);
        }
      }

      while (socialCommentsList.firstChild) {
        socialCommentsList.removeChild(socialCommentsList.firstChild);
      }

      socialCommentsList.appendChild(fragment);
    };

    let commentCount;

    if (data.length < COMMENTS_LIMIT) {
      commentCount = data.length;
      socialCommentsLoaderBtn.classList.add(`hidden`);
    } else {
      commentCount = COMMENTS_LIMIT;
    }

    drawComments(commentCount);


    if (data.length > COMMENTS_LIMIT) {

      const onSocialCommentsLoaderBtnClick = (e) => {
        e.preventDefault();
        commentCount += COMMENTS_LIMIT;
        drawComments(commentCount >= data.length ? data.length : commentCount);

        if (commentCount >= data.length) {
          socialCommentsLoaderBtn.classList.add(`hidden`);
          socialCommentsLoaderBtn.removeEventListener(`click`, onSocialCommentsLoaderBtnClick);
        }
      };

      socialCommentsLoaderBtn.addEventListener(`click`, onSocialCommentsLoaderBtnClick);
    }
  };

  window.comments = {
    renderComments,
  };

})();
