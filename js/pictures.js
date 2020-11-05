'use strict';

(() => {

  const RANDOM_PHOTOS_LIMIT = 10;
  const DEBOUNCE_INTERVAL = 500;

  const Key = {
    ESC: `Escape`,
    ENTER: `Enter`
  };

  let cleanDataPhotos = [];

  const photoContainer = document.querySelector(`.pictures`);
  const filtersContainer = document.querySelector(`.img-filters`);

  const template = document.querySelector(`#picture`)
    .content
    .querySelector(`.picture`);

  const drawPhoto = (photo) => {
    let photoElement = template.cloneNode(true);

    photoElement.querySelector(`.picture__img`).tabIndex = 0;
    photoElement.querySelector(`.picture__img`).src = photo.url;
    photoElement.querySelector(`.picture__img`).alt = photo.description;
    photoElement.querySelector(`.picture__comments`).textContent = photo.comments.length;
    photoElement.querySelector(`.picture__likes`).textContent = photo.likes;

    // Закрой бигпикчу по ESC
    const onBigPictureEscKeyDown = (e) => {
      if (e.code === Key.ESC) {
        e.preventDefault();

        const bigPicture = document.querySelector(`.big-picture`);
        bigPicture.classList.add(`hidden`);
        document.body.classList.remove(`modal-open`);

        window.bigpicture.onCloseClearData();

        document.removeEventListener(`keydown`, onBigPictureEscKeyDown);
      }
    };

    const onPhotoElementClick = (e) => {
      e.preventDefault();
      window.bigpicture.renderBigPicture(photo);
      document.addEventListener(`keydown`, onBigPictureEscKeyDown);
    };

    photoElement.addEventListener(`click`, onPhotoElementClick);

    return photoElement;
  };

  const drawPhotos = (photos) => {
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < photos.length; i++) {
      fragment.appendChild(drawPhoto(photos[i]));
    }

    photoContainer.appendChild(fragment);
  };

  // И cлушай клики на фильтрах
  const filters = document.querySelectorAll(`.img-filters__button`);
  let filterName = 0;

  // Приготовься рисовать фотки после клика на кнопке фильтра
  const drawFilteredPhotos = (arr) => {
    window.utils.getRenderedPhotos();
    window.utils.removeRenderedPhotos();
    window.utils.setDebounce(drawPhotos(arr), DEBOUNCE_INTERVAL)
    ;
  };

  const setActiveClass = (filter) => {
    let activeFilter = document.querySelector(`.img-filters__button--active`);
    if (activeFilter) {
      activeFilter.classList.remove(`img-filters__button--active`);
    }

    filter.classList.add(`img-filters__button--active`);
  };

  const onFilterClick = (e, filter) => {
    e.preventDefault();

    setActiveClass(filter);
    filterName = filter.id;

    // Рисуй превьюшки согласно фильтрам
    let sorted = cleanDataPhotos.slice();

    switch (filterName) {
      case `filter-default`:
        break;

      case `filter-random`:
        // Перемешай массив с фотками
        window.utils.shuffleArray(sorted);
        // Возьми из перемешанного массива первые 10 элементов
        sorted = sorted.slice(0, RANDOM_PHOTOS_LIMIT);
        break;

      case `filter-discussed`:
        // Отсортируй массив по значению нужного поля
        sorted.sort((a, b) => b.comments.length - a.comments.length);
        break;
      default:
        break;
    }
    drawFilteredPhotos(sorted);
  };

  filters.forEach((filter) => {
    filter.addEventListener(`click`, (e) => {
      onFilterClick(e, filter);
    });
  });

  const onSuccess = (photos) => {
    // Если данные пришли успешно
    // То нарисуй превьюшки фоток на странице
    cleanDataPhotos = photos.slice();

    drawPhotos(cleanDataPhotos);

    // И покажи фильтры
    filtersContainer.classList.toggle(`img-filters--inactive`);
  };

  // Если данные не пришли
  // То выведи сообщение с ошибкой
  const onError = () => {
    console.log(`тут какая-то ошибка выскочила. вопрос какая?`);
  };

  window.backend.load(onSuccess, onError);
})();
