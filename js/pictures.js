'use strict';

(() => {
  window.load((photos) => {
    let picturesContainer = document.querySelector(`.pictures`);
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < photos.length; i++) {
      let newElement = document.createElement(`a`);
      newElement.className = `picture`;
      newElement.onmouseover = () => {
        newElement.style.cursor = 'pointer';
      };
      newElement.onmouseleave = () => {
        newElement.style.cursor = '';
      };
      newElement.innerHTML = `
    <img class="picture__img" src="${photos[i].url}" width="182" height="182" alt="Случайная фотография">
    <p class="picture__info">
      <span class="picture__comments">${photos[i].comments.length}</span>
      <span class="picture__likes">${photos[i].likes}</span>
    </p>`;

      fragment.appendChild(newElement);
      picturesContainer.appendChild(fragment);

      // 4.4. При нажатии на любую из миниатюр, показывается блок .big-picture
      newElement.addEventListener('click', () => {
        /*        console.log('показывается блок .big-picture');*/
      });
    }
  }, () => {});
})();
