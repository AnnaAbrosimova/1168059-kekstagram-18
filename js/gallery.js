'use strict';
(function () {
  var similarListElement = document.querySelector('.pictures');
  var similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  window.renderPhotos = function (photo, i) {
    var photoElement = similarPictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').setAttribute('src', photo.url);
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__img').setAttribute('id', i);
    return photoElement;
  };
  window.clearPhotosContainer = function () {
    for (var i = 0; i < window.currentPhotos.length; i++) {
      var link = document.getElementById(i).parentNode;
      similarListElement.removeChild(link);
    }
    window.currentPhotos = [];
  };
  window.fillInPhotosContainer = function (photos) {
    window.currentPhotos = photos;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(window.renderPhotos(photos[i], i));
    }
    similarListElement.appendChild(fragment);
  };
  window.data = [];
  var onSuccess = function (photos) {
    window.originPhotos = photos;
    window.fillInPhotosContainer(photos);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
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
