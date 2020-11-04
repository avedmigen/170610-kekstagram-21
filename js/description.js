'use strict';

(() => {
  const MAX_SYMBOLS = 140;

  const inputTextDesc = document.querySelector(`.text__description`);

  const onInputTextDesc = (e) => {
    e.preventDefault();
    const invalidMessage = [];
    const inputText = inputTextDesc.value.toLowerCase().trim();

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

    inputTextDesc.setCustomValidity(invalidMessage.join(`. \n`));
    inputTextDesc.reportValidity();

    window.utils.drawErrorRedBorder(invalidMessage, inputTextDesc);

    document.removeEventListener(`input`, onInputTextDesc);
  };

  inputTextDesc.addEventListener(`input`, onInputTextDesc);

})();
