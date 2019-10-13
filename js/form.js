'use strict';
(function () {
  var loadFileButton = document.querySelector('.img-upload__input');
  var formEditPicture = document.querySelector('.img-upload__overlay');
  var closePicture = document.querySelector('.img-upload__cancel');
  var commentTextBox = document.querySelector('.text__description');
  var closeForm = function () {
    document.querySelector('.img-upload__input').value = '';
    formEditPicture.classList.add('hidden');
    document.removeEventListener('keydown', closeFormEsc);
  };
  var openForm = function () {
    formEditPicture.classList.remove('hidden');
    document.addEventListener('keydown', closeFormEsc);
  };
  var closeFormEsc = function (evt) {
    if ((evt.keyCode === window.ESC_KEYCODE) && (commentTextBox !== document.activeElement)) {
      closeForm();
    }
  };
  loadFileButton.addEventListener('change', function () {
    openForm();
  });
  closePicture.addEventListener('click', function () {
    closeForm();
  });
  // /работа со слайдером///
  var slider = document.querySelector('.effect-level__pin');
  var preview = document.querySelector('.img-upload__preview');
  var originalRadioBtn = document.querySelector('#effect-none');
  var chromeRadioBtn = document.querySelector('#effect-chrome');
  var sepiaRadioBtn = document.querySelector('#effect-sepia');
  var marvinRadioBtn = document.querySelector('#effect-marvin');
  var phobosRadioBtn = document.querySelector('#effect-phobos');
  var heatRadioBtn = document.querySelector('#effect-heat');
  originalRadioBtn.addEventListener('click', function () {
    preview.classList.add('effects__preview--none');
    preview.classList.remove('effects__preview--chrome');
    preview.classList.remove('effects__preview--sepia');
    preview.classList.remove('effects__preview--marvin');
    preview.classList.remove('effects__preview--phobos');
    preview.classList.remove('effects__preview--heat');
    document.querySelector('.img-upload__effect-level').classList.add('hidden');
    preview.removeAttribute('style');
  });
  chromeRadioBtn.addEventListener('click', function () {
    preview.classList.add('effects__preview--chrome');
    preview.classList.remove('effects__preview--none');
    preview.classList.remove('effects__preview--sepia');
    preview.classList.remove('effects__preview--marvin');
    preview.classList.remove('effects__preview--phobos');
    preview.classList.remove('effects__preview--heat');
    document.querySelector('.img-upload__effect-level').classList.remove('hidden');
    preview.removeAttribute('style');
  });
  sepiaRadioBtn.addEventListener('click', function () {
    preview.classList.add('effects__preview--sepia');
    preview.classList.remove('effects__preview--none');
    preview.classList.remove('effects__preview--chrome');
    preview.classList.remove('effects__preview--marvin');
    preview.classList.remove('effects__preview--phobos');
    preview.classList.remove('effects__preview--heat');
    document.querySelector('.img-upload__effect-level').classList.remove('hidden');
    preview.removeAttribute('style');
  });
  marvinRadioBtn.addEventListener('click', function () {
    preview.classList.add('effects__preview--marvin');
    document.querySelector('.img-upload__effect-level').classList.remove('hidden');
    preview.removeAttribute('style');
    preview.classList.remove('effects__preview--none');
    preview.classList.remove('effects__preview--chrome');
    preview.classList.remove('effects__preview--sepia');
    preview.classList.remove('effects__preview--phobos');
    preview.classList.remove('effects__preview--heat');
  });
  phobosRadioBtn.addEventListener('click', function () {
    preview.classList.add('effects__preview--phobos');
    document.querySelector('.img-upload__effect-level').classList.remove('hidden');
    preview.removeAttribute('style');
    preview.classList.remove('effects__preview--none');
    preview.classList.remove('effects__preview--chrome');
    preview.classList.remove('effects__preview--sepia');
    preview.classList.remove('effects__preview--marvin');
    preview.classList.remove('effects__preview--heat');
  });
  heatRadioBtn.addEventListener('click', function () {
    preview.classList.add('effects__preview--heat');
    preview.classList.remove('effects__preview--none');
    preview.classList.remove('effects__preview--chrome');
    preview.classList.remove('effects__preview--sepia');
    preview.classList.remove('effects__preview--marvin');
    preview.classList.remove('effects__preview--phobos');
    document.querySelector('.img-upload__effect-level').classList.remove('hidden');
    preview.removeAttribute('style');
  });
  slider.addEventListener('mouseup', function () {
    var slidervalue = document.querySelector('.effect-level__value');
    if (preview.classList.contains('effects__preview--chrome')) {
      preview.style.filter = 'grayscale(' + slidervalue.value + '%)';
    } else if (preview.classList.contains('effects__preview--sepia')) {
      preview.style.filter = 'sepia(' + slidervalue.value + '%)';
    } else if (preview.classList.contains('effects__preview--marvin')) {
      preview.style.filter = 'invert(' + slidervalue.value + '%)';
    } else if (preview.classList.contains('effects__preview--phobos')) {
      preview.style.filter = 'blur(' + slidervalue.value * 5 / 100 + 'px)';
    } else if (preview.classList.contains('effects__preview--heat')) {
      preview.style.filter = 'brightness(' + slidervalue.value * 3 / 100 + ')';
    }
  });
  // валидация хэш-тэгов///
  var hashTagTextBox = document.querySelector('.text__hashtags');
  var HASHTAG_MAX_NUM = 5;
  var HASHTAG_MAX_LENGTH = 20;
  var COMMENT_MAX_LENGTH = 140;
  var hasDuplicates = function (arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
      if (newArr.indexOf(arr[i]) !== -1) {
        return true;
      }
      newArr.push(arr[i]);
    }
    return false;
  };
  hashTagTextBox.addEventListener('change', function () {
    var str = hashTagTextBox.value.toUpperCase().trim();
    var array = str.split(' ');
    // проверка на длину массива
    if (array.length > HASHTAG_MAX_NUM) {
      hashTagTextBox.setCustomValidity('нельзя указать больше пяти хэш-тегов');
      return;
    } else {
      hashTagTextBox.setCustomValidity('');
    }
    // проверка на дубликаты
    if (hasDuplicates(array)) {
      hashTagTextBox.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
      return;
    } else {
      hashTagTextBox.setCustomValidity('');
    }
    for (var index = 0; index < array.length; ++index) {
      var hashtag = array[index];
      if (hashtag[0] !== '#') {
        hashTagTextBox.setCustomValidity('Хэш-тег должен начинаться с символа # (решётка)');
        break;
      }
      if (hashtag.length <= 1) {
        hashTagTextBox.setCustomValidity('хеш-тег не может состоять только из одной решётки');
        break;
      }
      if (hashtag.length > HASHTAG_MAX_LENGTH) {
        hashTagTextBox.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
        break;
      } else {
        hashTagTextBox.setCustomValidity('');
      }
    }
  });
  hashTagTextBox.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      evt.stopPropagation();
    }
  });
  // проверка комментариев
  commentTextBox.addEventListener('change', function () {
    if (commentTextBox.value.length > COMMENT_MAX_LENGTH) {
      commentTextBox.setCustomValidity('длина комментария не может составлять больше 140 символов');
    } else {
      commentTextBox.setCustomValidity('');
    }
  });
})();