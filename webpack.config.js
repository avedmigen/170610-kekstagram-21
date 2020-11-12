const path = require("path");

module.exports = {
  entry: [
    "./js/backend.js",
    "./js/utils.js",
    "./js/pictures.js",
    "./js/bigpicture.js",
    "./js/comment.js",
    "./js/reset.js",
    "./js/filter.js",
    "./js/preview.js",
    "./js/userimage.js",
    "./js/zoom.js",
    "./js/slider.js",
    "./js/saturation.js",
    "./js/hashtags.js",
    "./js/description.js",
    "./js/message.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
