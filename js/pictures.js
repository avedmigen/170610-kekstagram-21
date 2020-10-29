'use strict';

(() => {
  window.load((photos) => {
    // Если данные пришли успешно
    // То нарисуй превью фоток на странице
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

    for (let filter of filters) {
      filter.addEventListener(`click`, (e) => {
        e.preventDefault();
        filterName = filter.id;

        switch (filterName) {
          case `filter-default`:
            window.utils.getRenderedPhotos();
            window.utils.removeRenderedPhotos();
            drawPhotos(cleanDataPhotos, photoContainer, setPhotoTemplate, srcTmpl);
            break;

          case `filter-random`:
            // Перемешай массив с фотками
            const shuffled =
              cleanDataPhotos.slice()
              .map((a) => ({sort: Math.random(), value: a}))
              .sort((a, b) => a.sort - b.sort)
              .map((a) => a.value);

            shuffled.length = 10;
            window.utils.getRenderedPhotos();
            window.utils.removeRenderedPhotos();
            drawPhotos(shuffled, photoContainer, setPhotoTemplate, srcTmpl);
            break;

          case `filter-discussed`:
            const sorted = cleanDataPhotos.slice();
            // Отсортируй массив по значению поля
            sorted.sort((a, b) => b.comments.length - a.comments.length);
            window.utils.getRenderedPhotos();
            window.utils.removeRenderedPhotos();
            drawPhotos(sorted, photoContainer, setPhotoTemplate, srcTmpl);
            break;

          default:
            break;
        }
      });
    }
  });
})();
