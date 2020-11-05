'use strict';

(() => {
  const MAX_SYMBOLS = 20;
  const MAX_HASHTAGS = 5;

  const inputHashtags = document.querySelector(`.text__hashtags`);

  const onInputHashtagsInput = () => {

    const invalidMessage = [];

    inputHashtags.setCustomValidity(``);

    const inputText = inputHashtags.value.toLowerCase().trim();
    const regexp = /^#[\w\d]*$/;
    const regexpFlag = regexp.test(inputText);

    if (!inputText) {
      return;
    }

    const inputArray = inputText.split(/\s+/);

    if (inputArray.length === 0) {
      return;
    }

    const isStartNotHashtag = inputArray.some(function (item) {
      return item[0] !== `#`;
    });

    if (isStartNotHashtag) {
      invalidMessage.push(`Хэш-тег должен начинаться с символа #`);
    }

    const isOnlyLatticeHashtag = inputArray.some(function (item) {
      return item === `#`;
    });
    if (isOnlyLatticeHashtag) {
      invalidMessage.push(`Хеш-тег не может состоять только из одной решётки`);
    }

    if (!isStartNotHashtag && !regexpFlag) {
      invalidMessage.push(`Хэш-тег может содержать только буквы и числа без пробелов`);
    }

    const isSplitSpaceHashtag = inputArray.some((item) => {
      return item.indexOf(`#`, 1) >= 1;
    });
    if (isSplitSpaceHashtag) {
      invalidMessage.push(`Хэш-теги разделяются пробелами`);
    }

    const isRepeatHashtag = inputArray.some(function (item, i, arr) {
      return arr.indexOf(item, i + 1) >= i + 1;
    });
    if (isRepeatHashtag) {
      invalidMessage.push(`Один и тот же хэш-тег не может быть использован дважды`);
    }

    const isLongHashtag = inputArray.some((item) => {
      return item.length > MAX_SYMBOLS;
    });
    if (isLongHashtag) {
      invalidMessage.push(`Максимальная длина одного хэш-тега 20 символов, включая решётку`);
    }

    if (inputArray.length > MAX_HASHTAGS) {
      invalidMessage.push(`Нельзя указать больше пяти хэш-тегов`);
    }

    if (invalidMessage.length > 0) {
      inputHashtags.setCustomValidity(invalidMessage.join(`. \n`));
      window.utils.drawErrorRedBorder(invalidMessage, inputHashtags);
    }

  };

  inputHashtags.addEventListener(`input`, onInputHashtagsInput);
})();
