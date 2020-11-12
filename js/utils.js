'use strict';

let lastTimeout;

const setDebounce = (drawphotos, dbinterval) => {
  if (lastTimeout) {
    window.clearTimeout(lastTimeout);
  }
  lastTimeout = window.setTimeout(drawphotos, dbinterval);
};


const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

window.utils = {
  setDebounce,
  shuffleArray,
};
