'use strict';
// 2. Редактирование изображения и ограничения, накладываемые на поля

(() => {
  const DEFAULT_TRANSFORM_LEVEL = 100;
  const TRANSFORM_LEVEL_STEP = 25;
  const DEFAULT_DEPTH_LEVEL = 100;

  const Key = {
    ESC: `Escape`,
    ENTER: `Enter`
  };

  // 2. Загрузка нового изображения на сайт и заполнение информации о нём
  const documentBody = document.querySelector(`body`);
  const uploadFileInput = document.querySelector(`#upload-file`);
  const uploadCancelBtn = document.querySelector(`#upload-cancel`);
  const uploadOverlay = document.querySelector(`.img-upload__overlay`);

  // Использовать для отладки и потом убрать
  // uploadOverlay.classList.toggle(`hidden`);

  // Покажи попап превьюшки если в поле пришёл файл с фоткой
  uploadFileInput.onchange = (e) => {
    e.preventDefault();
    uploadOverlay.classList.toggle(`hidden`);
    documentBody.classList.add(`modal-open`);

    document.addEventListener(`keydown`, onPopupEscKeyDown);
  };

  // Закрой попап превьюшки по клику на кнопку с крестом
  uploadCancelBtn.addEventListener(`click`, (e) => {
    e.preventDefault();

    uploadOverlay.classList.toggle(`hidden`);
    documentBody.classList.remove(`modal-open`);
    uploadFileInput.value = null;

    document.removeEventListener(`keydown`, onPopupEscKeyDown);
  });

  const onPopupEscKeyDown = (e) => {
    if (e.code === Key.ESC) {
      e.preventDefault();
      uploadOverlay.classList.toggle(`hidden`);
      documentBody.classList.remove(`modal-open`);
      uploadFileInput.value = null;

      document.removeEventListener(`keydown`, onPopupEscKeyDown);
    }
  };

  // Так настраивай масштаб

  const scaleControlSmaller = document.querySelector(`.scale__control--smaller`);
  const scaleControlBigger = document.querySelector(`.scale__control--bigger`);
  const scaleControlValue = document.querySelector(`.scale__control--value`);
  const imgUploadPreview = document.querySelector(`.img-upload__preview`);

  scaleControlValue.value = `${DEFAULT_TRANSFORM_LEVEL}%`;
  let scaleValue = parseInt(scaleControlValue.value, 10);

  const setScaleValue = (value) => {
    scaleControlValue.value = `${value}%`;
    imgUploadPreview.style.transform = `scale(${value / 100})`;
  };

  scaleControlSmaller.addEventListener(`click`, (e) => {
    e.preventDefault();

    if (scaleValue !== TRANSFORM_LEVEL_STEP && scaleValue <= DEFAULT_TRANSFORM_LEVEL) {
      scaleValue -= 25;
    }
    setScaleValue(scaleValue);
  });

  scaleControlBigger.addEventListener(`click`, (e) => {
    e.preventDefault();

    if (scaleValue >= TRANSFORM_LEVEL_STEP && scaleValue < DEFAULT_TRANSFORM_LEVEL) {
      scaleValue += 25;
    }
    setScaleValue(scaleValue);
  });

  // Так накладывай эффекты на изображение

  const effectLevelLine = document.querySelector(`.effect-level__line`);
  const effectLevelValue = document.querySelector(`.effect-level__value`);
  const effectLevelPin = document.querySelector(`.effect-level__pin`);
  const effectLevelDepth = document.querySelector(`.effect-level__depth`);

  effectLevelLine.addEventListener(`mousedown`, function (e) {
    e.preventDefault();

    let startXCoord = {
      x: e.clientX
    };

    let onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();
      let shift = {
        x: startXCoord.x - moveEvt.clientX,
      };

      startXCoord = {
        x: moveEvt.clientX,
      };

      let PinOffsetLeft = effectLevelPin.offsetLeft - shift.x;
      let percCalc = (PinOffsetLeft / effectLevelLine.offsetWidth * 100);

      if (percCalc >= 0 && percCalc <= 100) {
        effectLevelPin.style.left = `${percCalc}%`;
        effectLevelDepth.style.width = `${percCalc}%`;
        effectLevelValue.value = `${percCalc}`;

        switch (imgUploadPreview.classList[1]) {
          case `effects__preview--chrome`:
            imgUploadPreview.style.filter = `grayscale(${effectLevelValue.value / 100})`;
            break;
          case `effects__preview--sepia`:
            imgUploadPreview.style.filter = `sepia(${effectLevelValue.value / 100})`;
            break;
          case `effects__preview--marvin`:
            imgUploadPreview.style.filter = `invert(${effectLevelValue.value}%)`;
            break;
          case `effects__preview--phobos`:
            imgUploadPreview.style.filter = `blur(${effectLevelValue.value * 0.03}px)`;
            break;
          case `effects__preview--heat`:
            imgUploadPreview.style.filter = `brightness(${1 + effectLevelValue.value * 0.02})`;
            break;
          default:
            imgUploadPreview.style.filter = ``;
            break;
        }
      }
    };

    let onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);

  });

  // Выбери превьюшку с эффектом
  const effectsItems = document.querySelectorAll(`.effects__item`);
  // Выбери инпут превьюшки с эффектом
  const effectsRadio = document.querySelectorAll(`.effects__radio`);

  // Приготовься удалять аттрибут чекед у инпутов когда потребуется
  const unsetCheckedAttr = () => {
    for (let item of effectsRadio) {
      item.removeAttribute(`checked`);
    }
  };

  // Скрой слайдер на эффекте Оригинал
  const slider = document.querySelector(`.img-upload__effect-level`);
  for (let item of effectsRadio) {
    if (item.id === `effect-none` && item.hasAttribute(`checked`)) {
      slider.classList.add(`hidden`);
    }
  }

  // Приготовься показать слайдер если не выбран эффект Оригинал
  const showSlider = (item) => {
    if (item.querySelector(`input`).id !== `effect-none`) {
      slider.classList.remove(`hidden`);
    } else {
      slider.classList.add(`hidden`);
    }
  };

  for (let item of effectsItems) {
    item.addEventListener(`click`, (e) => {
      e.preventDefault();
      unsetCheckedAttr(item);
      item.querySelector(`input`).checked = true;
      showSlider(item);
      effectLevelValue.value = null;
      effectLevelPin.style.left = `${DEFAULT_DEPTH_LEVEL}%`;
      effectLevelDepth.style.width = `${DEFAULT_DEPTH_LEVEL}%`;
      let effectClassName = `effects__preview--${item.childNodes[1].value}`;
      imgUploadPreview.classList.remove(imgUploadPreview.classList[1]);
      imgUploadPreview.classList.add(effectClassName);
      imgUploadPreview.style.filter = ``;
    });

    item.addEventListener(`keydown`, (e) => {
      if (e.code === `Enter`) {
        e.preventDefault();
        effectLevelValue.value = null;
        effectLevelPin.style.left = `${DEFAULT_DEPTH_LEVEL}%`;
        effectLevelDepth.style.width = `${DEFAULT_DEPTH_LEVEL}%`;
        let effectClassName = `effects__preview--${item.childNodes[1].value}`;
        imgUploadPreview.classList.remove(imgUploadPreview.classList[1]);
        imgUploadPreview.classList.add(effectClassName);
        imgUploadPreview.style.filter = ``;
      }
    });
  }

  // Тут покажешь информационное сообщение после отправки формы
  const mainTarget = document.querySelector(`main`);

  // Подготовь шаблон сообщения с ошибкой загрузки изображения
  const errorImgLoadedTmpl = document.querySelector(`#error`)
    .content
    .querySelector(`.error`)
    .cloneNode(true);

  const setErrorImgLoadedMsg = () => {
    let fragment = document.createDocumentFragment();
    fragment.appendChild(errorImgLoadedTmpl);
    mainTarget.appendChild(fragment);
    const errorButton = document.querySelector(`.error__button`);
    errorButton.addEventListener(`click`, (e) => {
      e.preventDefault();
      console.log(`Фигово!`);
    });
  };

  // Подготовь шаблон сообщения об успешной загрузке изображения
  const successImgLoadedTmpl = document.querySelector(`#success`)
    .content
    .querySelector(`.success`)
    .cloneNode(true);

  const setSuccessImgLoadedMsg = () => {
    let fragment = document.createDocumentFragment();
    fragment.appendChild(successImgLoadedTmpl);
    mainTarget.appendChild(fragment);
    const successButton = document.querySelector(`.success__button`);
    successButton.addEventListener(`click`, (e) => {
      e.preventDefault();
      console.log(`Круто!`);
    });
  };

  // Так отправляй форму на сервер
  const form = document.querySelector(`.img-upload__form`);
  form.addEventListener(`submit`, (e) => {
    window.backend.upload(() => {
      uploadOverlay.classList.toggle(`hidden`);
      setSuccessImgLoadedMsg();
    }, () => {
      uploadOverlay.classList.toggle(`hidden`);
      setErrorImgLoadedMsg();
    }, new FormData(form));
    e.preventDefault();
  });

})();
