'use strict';
(function () {
  var randomImage = document.querySelectorAll('.picture');
  var bigPicturePhotoImg = document.querySelector('.big-picture__img>img');
  for (var i = 0; i < randomImage.length; i++) {
    randomImage[i].addEventListener('click', function (evt) {
      var src;
      if (evt.target.hasAttribute('src')) {
        src = evt.target.getAttribute('src');
      } else {
        src = evt.target.querySelector('.picture__img').getAttribute('src');
      }
      bigPicturePhotoImg.setAttribute('src', src);
      window.bigPicture.classList.remove('hidden');
    });
    randomImage[i].addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ENTER_KEYCODE) {
        var src = evt.target.querySelector('.picture__img').getAttribute('src');
        bigPicturePhotoImg.setAttribute('src', src);
        window.bigPicture.classList.remove('hidden');
      }
    });
  }
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      window.bigPicture.classList.add('hidden');
    }
  });
})();
