'use strict';

(() => {
  window.load((photos) => {
    const DEBOUNCE_INTERVAL = 300;

    // Если данные пришли успешно
    // То нарисуй превьюшки фоток на странице
    const cleanDataPhotos = photos.slice();

    const photoContainer = document.querySelector(`.pictures`);

    const srcTmpl = document.querySelector(`#picture`)
      .content
      .querySelector(`.picture`);

    let setPhotoTemplate = (photo, template) => {
      let photoElement = template.cloneNode(true);
      photoElement.querySelector(`.picture__img`).src = photo.url;
      photoElement.querySelector(`.picture__img`).alt = photo.description;
      photoElement.querySelector(`.picture__comments`).textContent = photo.comments.length;
      photoElement.querySelector(`.picture__likes`).textContent = photo.likes;
      return photoElement;
    };

    let drawPhotos = (photoArr, container, template, srctmpl) => {
      let fragment = document.createDocumentFragment();
      for (let i = 0; i < photoArr.length; i++) {
        fragment.appendChild(template(photoArr[i], srctmpl));
      }
      container.appendChild(fragment);
    };

    drawPhotos(cleanDataPhotos, photoContainer, setPhotoTemplate, srcTmpl);

    // И покажи фильтры
    const filtersContainer = document.querySelector(`.img-filters`);
    filtersContainer.classList.toggle(`img-filters--inactive`);

    // И cлушай клики на фильтрах
    const filters = document.querySelectorAll(`.img-filters__button`);
    let filterName = 0;

    // Так будешь отрисовывать фотки после клика на кнопке фильтра
    const drawFilteredPhotos = (arr) => {
      window.utils.getRenderedPhotos();
      window.utils.removeRenderedPhotos();
      window.utils.setDebounce(drawPhotos(arr, photoContainer, setPhotoTemplate, srcTmpl), DEBOUNCE_INTERVAL)
      ;
    };

    for (let filter of filters) {
      filter.addEventListener(`click`, (e) => {
        e.preventDefault();
        filterName = filter.id;
        // Рисуй превьюшки согласно фильрам
        switch (filterName) {
          case `filter-default`:
            drawFilteredPhotos(cleanDataPhotos);
            break;
          case `filter-random`:
            // Перемешай массив с фотками
            const shuffled =
              cleanDataPhotos.slice()
              .map((a) => ({sort: Math.random(), value: a}))
              .sort((a, b) => a.sort - b.sort)
              .map((a) => a.value);
            shuffled.length = 10;
            drawFilteredPhotos(shuffled);
            break;

          case `filter-discussed`:
            const sorted = cleanDataPhotos.slice();
            // Отсортируй массив по значению поля
            sorted.sort((a, b) => b.comments.length - a.comments.length);
            drawFilteredPhotos(sorted);
            break;
          default:
            break;
        }
      });
    }
  });
})();
