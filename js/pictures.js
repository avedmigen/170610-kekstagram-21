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

        // Рисуй превьюшки согласно фильтрам
        let sorted = cleanDataPhotos.slice();

        switch (filterName) {
          case `filter-default`:
            break;

          case `filter-random`:
            // Перемешай массив с фотками
            window.utils.shuffleArray(sorted);
            break;

          case `filter-discussed`:
            // Отсортируй массив по значению нужного поля
            sorted.sort((a, b) => b.comments.length - a.comments.length);
            break;
          default:
            break;
        }
        drawFilteredPhotos(sorted);
      });
    }
  });
})();
