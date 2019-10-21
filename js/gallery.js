'use strict';
(function () {
  var similarListElement = document.querySelector('.pictures');
  var similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var urlMax = 25;
  var renderPhotos = function (photo, i) {
    var photoElement = similarPictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').setAttribute('src', photo.url);
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__img').setAttribute('id', i);
    return photoElement;
  };
  var onSuccess = function (photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < urlMax; i++) {
      fragment.appendChild(renderPhotos(photos[i], i));
    }
    similarListElement.appendChild(fragment);
    renderPhotos(photos[0], 0);
    if (document.querySelector('.error')) {
      document.querySelector('.error').remove();
    }
  };
  var errorTemplate = document.querySelector('#error')
   .content
   .querySelector('.error');
  window.errorTemplate = errorTemplate;
  var mainElement = document.querySelector('main');
  window.mainElement = mainElement;
  var onError = function (errorMessage) {
    var errorElement = errorTemplate.cloneNode(true);
    errorElement.querySelector('.error__title').textContent = errorMessage;
    mainElement.appendChild(errorElement);
  };
  window.load('https://js.dump.academy/kekstagram/data', onSuccess, onError);
})();
