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
    var maxCommentAmount = 5;
    var commentsLoad = document.querySelector('.comments-loader');
    var socCommentCount = document.querySelector('.social__comment-count');
    // функция показа комментов
    var showComments = function (amount, photos) {
    // определ€ем сколько из скольки комментариев у нас отображено
      var arrayAmount = socCommentCount.innerHTML.split(' ');
      arrayAmount[0] = amount;
      socCommentCount.innerHTML = arrayAmount.join(' ');
      // ищем уже отображенные комментарии чтобы их почистить
      var oldComments = document.querySelectorAll('.social__comment');
      if (oldComments.length > 0) {
        // удал€ем наши комментарии если есть
        for (var k = 0; k < oldComments.length; k++) {
          oldComments[k].remove();
        }
      }
      // ищем контейнер куда отобразим новые
      var socComments = document.querySelector('.social__comments');
      for (var j = 0; j < amount; j++) {
        // создаем элементы нашего комментари€
        var comment = document.createElement('li');
        var img = document.createElement('img');
        var p = document.createElement('p');
        // добавл€ем атрибуты к картинке
        img.classList.add('social__picture');
        img.setAttribute('src', photos.comments[j].avatar);
        img.setAttribute('alt', photos.comments[j].name);
        img.setAttribute('width', '35');
        img.setAttribute('height', '35');
        // добавляем атрибуты к тексту
        p.classList.add('social__text');
        p.innerHTML = photos.comments[j].message;
        // добавл€ем нашу картинку и текст внутрь контейнера li (который мы назвали коммент)
        comment.append(img);
        comment.append(p);
        // добавл€ем наш элемент li внутрь ul списка который мы достали и определили как socComments
        socComments.append(comment);
        comment.classList.add('social__comment');
      }
    };
    // функция которая определяет показывать или нет "показать еще"
    var hideShowButtons = function (amount, photos) {
      if (amount >= photos.comments.length) {
        commentsLoad.classList.add('visually-hidden');
      } else {
        commentsLoad.classList.remove('visually-hidden');
      }
    };
    if (maxCommentAmount < photo.comments.length) {
      showComments(maxCommentAmount, photo);
    } else {
      showComments(photo.comments.length, photo);
    }
    hideShowButtons(maxCommentAmount, photo);
    // задаем поведение кнопки подгрузки комментариев
    commentsLoad.addEventListener('click', function () {
      maxCommentAmount += 5;
      if (maxCommentAmount < photo.comments.length) {
        showComments(maxCommentAmount, photo);
      } else {
        showComments(photo.comments.length, photo);
      }
      hideShowButtons(maxCommentAmount, photo);
    });

    var closeBigPicture = document.querySelector('.big-picture__cancel');
    closeBigPicture.addEventListener('click', function () {
      bigPicture.classList.add('hidden');
    });
  };
})();
