'use strict';

(() => {
  const MAX_SYMBOLS = 140;

  const onInputTextDesc = (e) => {
    e.preventDefault();
    const invalidMessage = [];
    const inputText = window.inputText.value.toLowerCase().trim();

    if (!inputText) {
      return;
    }

    const inputArray = inputText.split(/\s+/);

    if (inputArray.length === 0) {
      return;
    }

    if (inputText.length > MAX_SYMBOLS) {
      invalidMessage.push(`Длина комментария не может составлять больше 140 символов. Удалите ${Math.abs(MAX_SYMBOLS - inputText.length)} симв.`);
    }

    window.inputText.setCustomValidity(invalidMessage.join(`. \n`));
    window.inputText.reportValidity();

    window.utils.drawErrorRedBorder(invalidMessage, window.inputText);

    document.removeEventListener(`input`, onInputTextDesc);
  };

  window.inputText.addEventListener(`input`, onInputTextDesc);

})();
