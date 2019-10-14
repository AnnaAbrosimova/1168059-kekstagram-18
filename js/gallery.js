'use strict';
(function () {
  var similarListElement = document.querySelector('.pictures');
  var similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var renderPhotos = function (photo) {
    var photoElement = similarPictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').setAttribute('src', photo.url);
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    return photoElement;
  };
  var photos = window.usersData.generatePhotos();
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < window.urlMax; i++) {
    fragment.appendChild(renderPhotos(photos[i]));
  }
  similarListElement.appendChild(fragment);
})();
