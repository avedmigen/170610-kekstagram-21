'use strict';

(() => {
  const MAX_SYMBOLS = 140;

  const onTextAreaInput = (e) => {
    e.preventDefault();
    const invalidMessages = [];
    const textAreaInputText = window.textArea.value.toLowerCase().trim();

    if (!textAreaInputText) {
      invalidMessages.splice(0, invalidMessages.length);
      window.textArea.setCustomValidity(``);

      return;
    }

    const inputArray = textAreaInputText.split(/\s+/);

    if (inputArray.length === 0) {
      return;
    }

    if (textAreaInputText.length > MAX_SYMBOLS) {
      invalidMessages.push(`Длина комментария не может составлять больше 140 символов. Удалите ${Math.abs(MAX_SYMBOLS - textAreaInputText.length)} симв.`);
    }

    window.textArea.setCustomValidity(invalidMessages.join(`. \n`));

    if (invalidMessages.length > 0) {
      window.textArea.setCustomValidity(invalidMessages.join(`. \n`));
      window.textArea.reportValidity();
      window.textArea.style.outlineColor = `red`;
    } else {
      window.textArea.style.outlineColor = ``;
    }

    document.removeEventListener(`input`, onTextAreaInput);
  };

  window.textArea.addEventListener(`input`, onTextAreaInput);

})();
