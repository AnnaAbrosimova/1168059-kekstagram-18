'use strict';
(function () {
  var similarList = document.querySelector('.pictures');
  var similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  window.renderPhotos = function (photo, i) {
    var clonePhoto = similarPictureTemplate.cloneNode(true);
    clonePhoto.querySelector('.picture__img').setAttribute('src', photo.url);
    clonePhoto.querySelector('.picture__likes').textContent = photo.likes;
    clonePhoto.querySelector('.picture__comments').textContent = photo.comments.length;
    clonePhoto.querySelector('.picture__img').setAttribute('id', i);
    return clonePhoto;
  };
  window.clearPhotosContainer = function () {
    for (var i = 0; i < window.currentPhotos.length; i++) {
      var link = document.getElementById(i).parentNode;
      similarList.removeChild(link);
    }
    window.currentPhotos = [];
  };
  window.fillInPhotosContainer = function (photos) {
    window.currentPhotos = photos;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(window.renderPhotos(photos[i], i));
    }
    similarList.appendChild(fragment);
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
  var main = document.querySelector('main');
  window.main = main;
  var onError = function (errorMessage) {
    var error = errorTemplate.cloneNode(true);
    error.querySelector('.error__title').textContent = errorMessage;
    main.appendChild(error);
  };
  window.load('https://js.dump.academy/kekstagram/data', onSuccess, onError);
})();
