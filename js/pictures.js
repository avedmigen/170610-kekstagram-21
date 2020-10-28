'use strict';

(() => {
  window.load((photos) => {
    const PICTURES_CONTAINER = document.querySelector(`.pictures`);
    const pictureTemplate = document.querySelector(`#picture`)
      .content
      .querySelector(`.picture`);

    let renderPhotos = (photo) => {
      let photoElement = pictureTemplate.cloneNode(true);
      photoElement.querySelector(`.picture__img`).src = photo.url;
      photoElement.querySelector(`.picture__comments`).textContent = photo.comments.length;
      photoElement.querySelector(`.picture__likes`).textContent = photo.likes;
      return photoElement;
    };

    let fragment = document.createDocumentFragment();

    for (let i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPhotos(photos[i]));
    }

    PICTURES_CONTAINER.appendChild(fragment);
  });

})();
