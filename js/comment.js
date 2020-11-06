'use strict';

(() => {

  const COMMENTS_LIMIT = 5;

  const renderComments = (data) => {

    const socialCommentsList = document.querySelector(`.social__comments`);
    const socialComment = document.querySelector(`.social__comment`);
    const socialCommentCount = document.querySelector(`.social__comment-count`);
    const socialCommentsLoaderButton = document.querySelector(`.social__comments-loader`);


    const commentTemplate = (num) => {
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
          fragment.appendChild(commentTemplate(i));
        }
      } else if (limit > data.length) {
        for (let i = 0; i < data.length; i++) {
          fragment.appendChild(commentTemplate(i));
          socialCommentsLoaderButton.classList.add(`hidden`);
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
      socialCommentsLoaderButton.classList.add(`hidden`);
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
          socialCommentsLoaderButton.classList.add(`hidden`);
          socialCommentsLoaderButton.removeEventListener(`click`, onSocialCommentsLoaderBtnClick);
        }
      };

      socialCommentsLoaderButton.addEventListener(`click`, onSocialCommentsLoaderBtnClick);
    }
  };

  window.comment = {
    renderComments,
  };

})();
