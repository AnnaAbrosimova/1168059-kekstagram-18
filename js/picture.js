'use strict';
(function () {
  // document.querySelector('.big-picture').classList.remove('hidden');
  window.setBigPicture = function (id) {
    var bigPicture = document.querySelector('.big-picture');
    window.bigPicture = bigPicture;
    var photo = window.respPhotos[id];
    // bigPicture.querySelector('.big-picture__img').setAttribute('src', photo.url);
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    document.querySelector('.social__caption').textContent = photo.description;
    var socComments = document.getElementsByClassName('social__comments')[0];
    // console.log(socComments);
    for (var j = 0; j < photo.comments.length; j++) {
      // создаем элементы нашего комментари€
      var comment = document.createElement('li');
      var img = document.createElement('img');
      var p = document.createElement('p');
      // добавляем атрибуты к картинке
      img.classList.add('social__picture');
      img.setAttribute('src', photo.comments[j].avatar);
      img.setAttribute('alt', photo.comments[j].name);
      img.setAttribute('width', '35');
      img.setAttribute('height', '35');
      // добавляем атрибуты к тексту
      p.classList.add('social__text');
      p.innerHTML = photo.comments[j].message;
      // добавляем нашу картинку и текст внутрь контейнера li (который мы назвали коммент)
      comment.append(img);
      comment.append(p);
      // добавляем наш элемент li внутрь ul списка который мы достали и определили как socComments
      socComments.append(comment);
      comment.classList.add('social__comment');
    }
    /* var socCommentCount = document.querySelector('.social__comment-count');
    socCommentCount.classList.add('visually-hidden');
    var commentsLoad = document.querySelector('.comments-loader');
    commentsLoad.classList.add('visually-hidden');*/
    var closeBigPicture = document.querySelector('.big-picture__cancel');
    closeBigPicture.addEventListener('click', function () {
      bigPicture.classList.add('hidden');
    });
  };
})();
