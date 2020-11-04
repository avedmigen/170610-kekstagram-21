'use strict';

(() => {

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
    const drawComments = () => {
      let fragment = document.createDocumentFragment();

      for (let i = 0; i < data.comments.length; i++) {
        fragment.appendChild(commentTmpl(i));
      }

      while (socialCommentsList.firstChild) {
        socialCommentsList.removeChild(socialCommentsList.firstChild);
      }

      socialCommentsList.appendChild(fragment);
    };

    drawComments();

  };

  window.comments = {
    renderComments,
  };

})();
