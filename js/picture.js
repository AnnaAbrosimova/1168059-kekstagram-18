'use strict';
(function () {
  window.setBigPicture = function (id) {
    var bigPicture = document.querySelector('.big-picture');
    window.bigPicture = bigPicture;
    var photo = window.originPhotos[id];
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    document.querySelector('.social__caption').textContent = photo.description;
    var maxCommentAmount = 5;
    var commentsLoad = document.querySelector('.comments-loader');
    var socCommentCount = document.querySelector('.social__comment-count');
    var showComments = function (amount, photos) {
      var amountComments = socCommentCount.innerHTML.split(' ');
      amountComments[0] = amount;
      socCommentCount.innerHTML = amountComments.join(' ');
      var oldComments = document.querySelectorAll('.social__comment');
      if (oldComments.length > 0) {
        for (var k = 0; k < oldComments.length; k++) {
          oldComments[k].remove();
        }
      }
      var socComments = document.querySelector('.social__comments');
      for (var j = 0; j < amount; j++) {
        var comment = document.createElement('li');
        var img = document.createElement('img');
        var p = document.createElement('p');
        img.classList.add('social__picture');
        img.setAttribute('src', photos.comments[j].avatar);
        img.setAttribute('alt', photos.comments[j].name);
        img.setAttribute('width', '35');
        img.setAttribute('height', '35');
        p.classList.add('social__text');
        p.innerHTML = photos.comments[j].message;
        comment.append(img);
        comment.append(p);
        socComments.append(comment);
        comment.classList.add('social__comment');
      }
    };
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
