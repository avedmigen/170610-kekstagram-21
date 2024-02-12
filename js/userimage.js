'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const fileChooser = document.querySelector(`#upload-file`);
const preview = document.querySelector(`.img-upload__preview img`);
const effectPreviews = document.querySelectorAll(`.effects__preview`);

const onFileChooserChange = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    const onReaderLoad = () => {
      preview.src = reader.result;

      effectPreviews.forEach((item) => {
        item.style.backgroundImage = `url(${reader.result})`;
      });
    };

    reader.addEventListener(`load`, onReaderLoad);

    reader.readAsDataURL(file);
  }
};

fileChooser.addEventListener(`change`, onFileChooserChange);
