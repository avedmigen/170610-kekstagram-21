'use strict';

const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;

const onHashtagInputInput = () => {
  const invalidMessages = [];

  const inputText = window.hashtagInput.value.toLowerCase().trim();

  if (!inputText) {
    window.hashtagInput.setCustomValidity(``);

    return;
  }

  const inputArray = inputText.split(/\s+/);

  if (inputArray.length === 0) {
    return;
  }

  const isStartNotHashtag = inputArray.some((item) => {
    return item[0] !== `#`;
  });

  if (isStartNotHashtag) {
    invalidMessages.push(`Хэш-тег должен начинаться с символа #`);
  }

  const isOnlyLatticeHashtag = inputArray.some((item) => {
    return item === `#`;
  });
  if (isOnlyLatticeHashtag) {
    invalidMessages.push(`Хеш-тег не может состоять только из одной решётки`);
  }

  const regexp = new RegExp(`[^#а-яёa-z0-9]`, `i`);
  inputArray.forEach((hashtag) => {
    if (regexp.test(hashtag)) {
      invalidMessages.push(
        `Хэш-тег может содержать только буквы и числа без пробелов`
      );
    }
  });

  const isSplitSpaceHashtag = inputArray.some((item) => {
    return item.indexOf(`#`, 1) >= 1;
  });
  if (isSplitSpaceHashtag) {
    invalidMessages.push(`Хэш-теги разделяются пробелами`);
  }

  const isRepeatHashtag = inputArray.some((item, i, arr) => {
    return arr.indexOf(item, i + 1) >= i + 1;
  });
  if (isRepeatHashtag) {
    invalidMessages.push(
      `Один и тот же хэш-тег не может быть использован дважды`
    );
  }

  const isLongHashtag = inputArray.some((item) => {
    return item.length > MAX_SYMBOLS;
  });
  if (isLongHashtag) {
    invalidMessages.push(
      `Максимальная длина одного хэш-тега 20 символов, включая решётку`
    );
  }

  if (inputArray.length > MAX_HASHTAGS) {
    invalidMessages.push(`Нельзя указать больше пяти хэш-тегов`);
  }

  window.hashtagInput.setCustomValidity(invalidMessages.join(`. \n`));

  if (invalidMessages.length > 0) {
    window.hashtagInput.setCustomValidity(invalidMessages.join(`. \n`));
    window.hashtagInput.style.outlineColor = `red`;
  } else {
    window.hashtagInput.style.outlineColor = ``;
  }
};

window.hashtagInput.addEventListener(`input`, onHashtagInputInput);
