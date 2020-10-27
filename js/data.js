'use strict';

(() => {
  window.load((photos) => {
    let picturesContainer = document.querySelector(`.pictures`);
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < photos.length; i++) {
      let newElement = document.createElement(`a`);
      newElement.className = `picture`;
      newElement.innerHTML = `
    <img class="picture__img" src="${photos[i].url}" width="182" height="182" alt="Случайная фотография">
    <p class="picture__info">
      <span class="picture__comments">${photos[i].comments}</span>
      <span class="picture__likes">${photos[i].likes}</span>
    </p>`;

      fragment.appendChild(newElement);
      picturesContainer.appendChild(fragment);
    }
  }, () => {});
})();
