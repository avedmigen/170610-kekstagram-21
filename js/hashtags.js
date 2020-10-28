'use strict';
// 2.3. Хэш-теги:

(() => {
  const HASHTAG_MIN_LENGTH = 2;
  const HASHTAG_MAX_LENGTH = 20;
  const HASHTAG_MAX_ITEMS = 5;
  /*  const COMMENT_MAX_LENGTH = 140;*/

  const imgUploadForm = document.querySelector(`.img-upload__form`);
  const textHashtags = imgUploadForm[17];

  textHashtags.addEventListener(`input`, (e) => {
    e.preventDefault();
    let hashtagValues = textHashtags.value;
    let hashtags = hashtagValues.split(` `);

    for (let hashtag of hashtags) {
      let valueLenght = hashtag.length;
      let regexp = /^#[\w\d]*$/;
      let regexpFlag = regexp.test(hashtag);

      if (hashtag !== ``) {
        if (!regexpFlag) {
          textHashtags.setCustomValidity(`Хэш-тег должен начинаться с # (решётки) и может содержать только буквы и числа без пробелов.`);
        } else if (valueLenght < HASHTAG_MIN_LENGTH) {
          textHashtags.setCustomValidity(`Хеш-тег не может состоять только из одной решётки. Добавьте буквы и числа без пробелов.`);
        } else if (hashtags.length > HASHTAG_MAX_ITEMS) {
          textHashtags.setCustomValidity(`Макс. кол-во хэш-тегов - ${HASHTAG_MAX_ITEMS}. Удалите ${hashtags.length - HASHTAG_MAX_ITEMS} хэш-тег.`);
        } else if (valueLenght > HASHTAG_MAX_LENGTH) {
          textHashtags.setCustomValidity(`Макс.длина одного хэш-тега - 20 симв, включая решётку. Удалите ${HASHTAG_MAX_LENGTH - valueLenght} симв.`);
        } else {
          textHashtags.setCustomValidity(``);
        }
      }

      textHashtags.reportValidity();
    }
  });

})();
