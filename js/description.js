'use strict';

(() => {
  const MAX_SYMBOLS = 140;

  const onInputTextInput = (e) => {
    e.preventDefault();
    const invalidMessages = [];
    const inputText = window.textInput.value.toLowerCase().trim();

    if (!inputText) {
      return;
    }

    const inputArray = inputText.split(/\s+/);

    if (inputArray.length === 0) {
      return;
    }

    if (inputText.length > MAX_SYMBOLS) {
      invalidMessages.push(`Длина комментария не может составлять больше 140 символов. Удалите ${Math.abs(MAX_SYMBOLS - inputText.length)} симв.`);
    }

    window.textInput.setCustomValidity(invalidMessages.join(`. \n`));
    window.textInput.reportValidity();

    window.utils.drawErrorRedBorder(invalidMessages, window.textInput);

    document.removeEventListener(`input`, onInputTextInput);
  };

  window.textInput.addEventListener(`input`, onInputTextInput);

})();
