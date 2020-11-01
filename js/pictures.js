'use strict';

(() => {
  window.load((photos) => {
    const RANDOM_PHOTOS_LIMIT = 10;
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

    // Так будешь рисовать фотки после клика на кнопке фильтра
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
        listenClicksOnThumbnails();
      });
    }

    // Слушай клики на превьюшках
    const listenClicksOnThumbnails = () => {
      const previews = document.querySelectorAll(`.picture`);
      const bigPicContainer = document.querySelector(`.big-picture`);

      for (let preview of previews) {
        preview.addEventListener(`click`, (e) => {
          e.preventDefault();
          // Дай урл превьюшки
          const previewImg = preview.querySelector(`.picture__img`);
          let previewUrl = previewImg.attributes.src.value;
          // Найди в массиве с фотками объект, соответстующий урлу превьюшки
          const pictureUrl = (picture) => (picture.url === previewUrl ? true : false);
          const pictureObj = cleanDataPhotos.filter((pictureUrl));
          console.log(pictureObj);
          // Найди контейнер бигпикчи
          const bigPic = bigPicContainer.querySelector(`.big-picture__preview`);
          console.log(bigPic);
          // Замени путь к файлу и альт бигпикчи
          const bigPicImg = bigPic.querySelector(`.big-picture__img > img`);
          bigPicImg.src = pictureObj[0].url;
          bigPicImg.alt = pictureObj[0].description;
          // Замени количество лайков
          const bigPicLikes = bigPic.querySelector(`.likes-count`);
          bigPicLikes.textContent = pictureObj[0].likes;
          // Замени количество комментов
          const bigPicСommentsCount = bigPic.querySelector(`.comments-count`);
          bigPicСommentsCount.textContent = pictureObj[0].comments.length;
          // Замени контент комментов
          const bigPicСommentsList = bigPic.querySelector(`.social__comments`);
          console.log(bigPicСommentsList);

          /*          const bigPicСomment = bigPicСommentsList.querySelector(`.social__comment`);
          console.log(bigPicСomment); */
          /*        const bigPicСommentImg = bigPicСommentsList.querySelector(`.social__picture`);
                    console.dir(bigPicСommentImg); */

          // Шаблон коммента для заполнения данными
          const bigPicСommentTmpl = (num) => {
            return `<li class="social__comment">
                    <img
                        class="social__picture"
                        src="${pictureObj[0].comments[num].avatar}"
                        alt="${pictureObj[0].comments[num].name}"
                        width="35" height="35">
                    <p class="social__text">${pictureObj[0].comments[num].message}</p>
                </li>`;
          };

          while (bigPicСommentsList.firstChild) {
            bigPicСommentsList.removeChild(bigPicСommentsList.firstChild);
          }

          const bigPicСomments = () => {
            for (let i = 0; i < pictureObj[0].comments.length; i++) {
              bigPicСommentsList.appendChild(bigPicСommentTmpl(i));
            }
          };

          // Покажи бигпикчу
          bigPicContainer.classList.remove(`hidden`);
        });
      }

      // Закрой попап по клику на кнопке с крестом
      const bigPictureCancel = document.querySelector(`.big-picture__cancel`);
      bigPictureCancel.addEventListener(`click`, (e) => {
        e.preventDefault();
        bigPicContainer.classList.add(`hidden`);
      });
    };

    listenClicksOnThumbnails();

  });
})();
