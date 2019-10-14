'use strict';
(function () {
  // document.querySelector('.big-picture').classList.remove('hidden');
  var bigPicture = document.querySelector('.big-picture');
  window.bigPicture = bigPicture;
  var photos = window.usersData.generatePhotos();
  bigPicture.querySelector('.big-picture__img').setAttribute('src', photos[0].url);
  bigPicture.querySelector('.likes-count').textContent = photos[0].likes;
  bigPicture.querySelector('.comments-count').textContent = photos[0].comments.length;
  document.querySelector('.social__caption').textContent = photos[0].description;
  var socComment = document.querySelector('.social__comments');
  for (var j = 0; j < photos[0].comments.length; j++) {
    socComment.querySelector('.social__picture').setAttribute('src', 'img/avatar-' + window.getRandom(1, 6) + '.svg');
    socComment.querySelector('.social__picture').setAttribute('alt', photos[0].comments[j].name);
    socComment.querySelector('.social__text').textContent = photos[0].comments[j].message;
  }
  var socCommentCount = document.querySelector('.social__comment-count');
  socCommentCount.classList.add('visually-hidden');
  var commentsLoad = document.querySelector('.comments-loader');
  commentsLoad.classList.add('visually-hidden');
  var closeBigPicture = document.querySelector('.big-picture__cancel');
  closeBigPicture.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
  });
})();
