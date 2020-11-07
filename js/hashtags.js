'use strict';

(() => {
  const MAX_SYMBOLS = 20;
  const MAX_HASHTAGS = 5;

  const onInputHashtagsInput = () => {

    const invalidMessages = [];

    window.hashtagsInput.setCustomValidity(``);

    const inputText = window.hashtagsInput.value.toLowerCase().trim();
    const regexp = /^#[a-яА-Яu\w\d]*$/;
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
      invalidMessages.push(`Хэш-тег должен начинаться с символа #`);
    }

    const isOnlyLatticeHashtag = inputArray.some(function (item) {
      return item === `#`;
    });
    if (isOnlyLatticeHashtag) {
      invalidMessages.push(`Хеш-тег не может состоять только из одной решётки`);
    }

    if (!isStartNotHashtag && !regexpFlag) {
      invalidMessages.push(`Хэш-тег может содержать только буквы и числа без пробелов`);
    }

    const isSplitSpaceHashtag = inputArray.some((item) => {
      return item.indexOf(`#`, 1) >= 1;
    });
    if (isSplitSpaceHashtag) {
      invalidMessages.push(`Хэш-теги разделяются пробелами`);
    }

    const isRepeatHashtag = inputArray.some(function (item, i, arr) {
      return arr.indexOf(item, i + 1) >= i + 1;
    });
    if (isRepeatHashtag) {
      invalidMessages.push(`Один и тот же хэш-тег не может быть использован дважды`);
    }

    const isLongHashtag = inputArray.some((item) => {
      return item.length > MAX_SYMBOLS;
    });
    if (isLongHashtag) {
      invalidMessages.push(`Максимальная длина одного хэш-тега 20 символов, включая решётку`);
    }

    if (inputArray.length > MAX_HASHTAGS) {
      invalidMessages.push(`Нельзя указать больше пяти хэш-тегов`);
    }

    if (invalidMessages.length > 0) {
      window.hashtagsInput.setCustomValidity(invalidMessages.join(`. \n`));
      window.hashtagsInput.reportValidity();
      window.utils.drawErrorRedBorder(invalidMessages, window.hashtagsInput);
    }

  };

  window.hashtagsInput.addEventListener(`input`, onInputHashtagsInput);

})();
