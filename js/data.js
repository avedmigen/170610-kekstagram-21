'use strict';
// Cгенерировать моки и воспользоваться шаблонизацией для отрисовки их в разметку страницы

(() => {

  let fragment = document.createDocumentFragment();
  let picturesContainer = document.querySelector(`.pictures`);
  let photos = [];

  let setPhotos = (num) => {
    for (let i = 0; i < num; i++) {
      window.setComments(window.minMaxRandomize(1, 3));
      photos.push({
        url: `photos/${i + 1}.jpg`,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. `,
        likes: window.minMaxRandomize(15, 200),
        comments: window.comments.length
      });
    }
  };

  let getPhotos = (num) => {

    setPhotos(num);

    for (let i = 0; i < num; i++) {
      let newElement = document.createElement(`a`);
      newElement.className = `picture`;
      newElement.innerHTML = `
    <img class="picture__img" src="${photos[i].url}" width="182" height="182" alt="Случайная фотография">
    <p class="picture__info">
      <span class="picture__comments">${photos[i].comments}</span>
      <span class="picture__likes">${photos[i].likes}</span>
    </p>`;

      fragment.appendChild(newElement);

    }
  };

  getPhotos(25);
  picturesContainer.appendChild(fragment);


})();


