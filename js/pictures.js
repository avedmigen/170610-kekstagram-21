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


    const onBigPictureEscKeyDown = (e) => {
      if (e.code === Key.ESC) {
        e.preventDefault();

        const bigPicture = document.querySelector(`.big-picture`);
        bigPicture.classList.add(`hidden`);
        document.body.classList.remove(`modal-open`);

        window.bigpicture.clear();

        document.removeEventListener(`keydown`, onBigPictureEscKeyDown);
      }
    };

    const onPhotoElementClick = (e) => {
      e.preventDefault();
      window.bigpicture.render(photo);
      document.addEventListener(`keydown`, onBigPictureEscKeyDown);
    };

    photoElement.addEventListener(`click`, onPhotoElementClick);

    return photoElement;
  };

  const drawPhotos = (photos) => {
    let fragment = document.createDocumentFragment();

    photos.forEach((photo) => {
      fragment.appendChild(drawPhoto(photo));
    });

    photoContainer.appendChild(fragment);
  };


  const filters = document.querySelectorAll(`.img-filters__button`);
  let filterName = 0;

  const getRenderedPhotos = () => {
    document.querySelectorAll(`.picture`);
  };

  const removeRenderedPhotos = () => {
    const renderedPhotos = document.querySelectorAll(`.picture`);
    renderedPhotos.forEach((photo) => {
      photo.remove();
    });
  };

  const drawFilteredPhotos = (arr) => {
    getRenderedPhotos();
    removeRenderedPhotos();
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


    let sorted = cleanDataPhotos.slice();

    switch (filterName) {
      case `filter-default`:
        break;

      case `filter-random`:

        window.utils.shuffleArray(sorted);

        sorted = sorted.slice(0, RANDOM_PHOTOS_LIMIT);
        break;

      case `filter-discussed`:

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

    cleanDataPhotos = photos.slice();

    drawPhotos(cleanDataPhotos);


    filtersContainer.classList.toggle(`img-filters--inactive`);
  };


  const onError = (handlerName) => {
    const div = document.createElement(`div`);
    div.style.padding = `20px`;
    div.style.backgroundColor = `tomato`;
    div.style.color = `yellow`;
    div.style.textAlign = `center`;
    div.prepend(`Не удалось загрузить изображения. ${handlerName}`);
    window.mainTag.prepend(div);

  };

  window.backend.load(onSuccess, onError);
})();
