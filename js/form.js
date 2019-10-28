'use strict';
(function () {
  var loadFileButton = document.querySelector('.img-upload__input');
  var formEditPicture = document.querySelector('.img-upload__overlay');
  var closePicture = document.querySelector('.img-upload__cancel');
  var commentTextBox = document.querySelector('.text__description');
  var imgForm = document.querySelector('#upload-select-image');
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  window.ENTER_KEYCODE = ENTER_KEYCODE;
  window.ESC_KEYCODE = ESC_KEYCODE;
  var loadingElm = document.querySelector('.img-upload__message--loading');
  var slider = document.querySelector('.effect-level__pin');
  var preview = document.querySelector('.img-upload__preview');
  var originalRadioBtn = document.querySelector('#effect-none');
  var chromeRadioBtn = document.querySelector('#effect-chrome');
  var sepiaRadioBtn = document.querySelector('#effect-sepia');
  var marvinRadioBtn = document.querySelector('#effect-marvin');
  var phobosRadioBtn = document.querySelector('#effect-phobos');
  var heatRadioBtn = document.querySelector('#effect-heat');
  var hashTagTextBox = document.querySelector('.text__hashtags');
  var HASHTAG_MAX_NUM = 5;
  var HASHTAG_MAX_LENGTH = 20;
  var controlSmall = document.querySelector('.scale__control--smaller');
  var controlBig = document.querySelector('.scale__control--bigger');
  var controlValue = document.querySelector('.scale__control--value');
  var STEP = 25;
  var closeForm = function () {
    document.querySelector('.img-upload__input').value = '';
    formEditPicture.classList.add('hidden');
    document.removeEventListener('keydown', onCloseFormEsc);
    returnOriginal();
    cleanValuesForm();
  };
  var openForm = function () {
    formEditPicture.classList.remove('hidden');
    imgForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
      if (loadingElm === null) {
        var message = document.querySelector('#messages');
        showTemplate(message);
      }
      document.querySelector('.img-upload__message--loading').classList.remove('visually-hidden');
      window.upload('https://js.dump.academy/kekstagram', new FormData(imgForm), onSuccess, onError);
    });
    document.addEventListener('keydown', onCloseFormEsc);
  };
  var onCloseFormEsc = function (evt) {
    if ((evt.keyCode === window.ESC_KEYCODE) && (commentTextBox !== document.activeElement)) {
      closeForm();
    }
  };
  loadFileButton.addEventListener('change', function () {
    openForm();
    document.querySelector('.img-upload__effect-level').classList.add('hidden');
  });
  closePicture.addEventListener('click', function () {
    closeForm();
  });
  // /работа со слайдером///
  var setSliderPosition = function (value) {
    var line = document.querySelector('.effect-level__line');
    var depth = document.querySelector('.effect-level__depth');
    slider.style.left = value * line.offsetWidth + 'px';
    depth.style.width = value * 100 + '%';
  };
  var setFilter = function () {
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
  };
  var returnOriginal = function () {
    preview.classList.add('effects__preview--none');
    preview.classList.remove('effects__preview--chrome');
    preview.classList.remove('effects__preview--sepia');
    preview.classList.remove('effects__preview--marvin');
    preview.classList.remove('effects__preview--phobos');
    preview.classList.remove('effects__preview--heat');
    document.querySelector('.img-upload__effect-level').classList.add('hidden');
    preview.removeAttribute('style');
  };
  originalRadioBtn.addEventListener('click', function () {
    returnOriginal(); // если оригинал, то убираем все классы, скрываем слайдер
  });
  var resetValuesImg = function () {
    document.querySelector('.img-upload__effect-level').classList.remove('hidden');
    preview.removeAttribute('style');
    setSliderPosition(1.0);
    controlValue.setAttribute('value', '100%');
  };
  chromeRadioBtn.addEventListener('click', function () {
    preview.classList.add('effects__preview--chrome');
    preview.classList.remove('effects__preview--none');
    preview.classList.remove('effects__preview--sepia');
    preview.classList.remove('effects__preview--marvin');
    preview.classList.remove('effects__preview--phobos');
    preview.classList.remove('effects__preview--heat');
    resetValuesImg();
  });
  sepiaRadioBtn.addEventListener('click', function () {
    preview.classList.add('effects__preview--sepia');
    preview.classList.remove('effects__preview--none');
    preview.classList.remove('effects__preview--chrome');
    preview.classList.remove('effects__preview--marvin');
    preview.classList.remove('effects__preview--phobos');
    preview.classList.remove('effects__preview--heat');
    resetValuesImg();
  });
  marvinRadioBtn.addEventListener('click', function () {
    preview.classList.add('effects__preview--marvin');
    preview.classList.remove('effects__preview--none');
    preview.classList.remove('effects__preview--chrome');
    preview.classList.remove('effects__preview--sepia');
    preview.classList.remove('effects__preview--phobos');
    preview.classList.remove('effects__preview--heat');
    resetValuesImg();
  });
  phobosRadioBtn.addEventListener('click', function () {
    preview.classList.add('effects__preview--phobos');
    preview.classList.remove('effects__preview--none');
    preview.classList.remove('effects__preview--chrome');
    preview.classList.remove('effects__preview--sepia');
    preview.classList.remove('effects__preview--marvin');
    preview.classList.remove('effects__preview--heat');
    resetValuesImg();
  });
  heatRadioBtn.addEventListener('click', function () {
    preview.classList.add('effects__preview--heat');
    preview.classList.remove('effects__preview--none');
    preview.classList.remove('effects__preview--chrome');
    preview.classList.remove('effects__preview--sepia');
    preview.classList.remove('effects__preview--marvin');
    preview.classList.remove('effects__preview--phobos');
    resetValuesImg();
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
  slider.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX
    };
    var dragged = false;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX
      };
      var line = document.querySelector('.effect-level__line');
      var leftCandidate = slider.offsetLeft - shift.x;
      if (leftCandidate > 0 && leftCandidate < line.offsetWidth) {
        startCoords = {
          x: moveEvt.clientX
        };
        setSliderPosition(leftCandidate / line.offsetWidth);
        var slidervalue = document.querySelector('.effect-level__value');
        slidervalue.value = leftCandidate / line.offsetWidth * 100;
        setFilter();
      }
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (dragged) {
        var onClickPreventDefault = function () {
          evt.preventDefault();
          slider.removeEventListener('click', onClickPreventDefault);
        };
        slider.addEventListener('click', onClickPreventDefault);
      }
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  // валидация хэш-тэгов///
  var hasDuplicates = function (arr) {
    var newHashTags = [];
    for (var i = 0; i < arr.length; i++) {
      if (newHashTags.indexOf(arr[i]) !== -1) {
        return true;
      }
      newHashTags.push(arr[i]);
    }
    return false;
  };
  hashTagTextBox.addEventListener('input', function () {
    var str = hashTagTextBox.value.toUpperCase().trim();
    var hashTags = [];
    if (str !== '') {
      hashTags = str.split(' ');
    }
    // проверка на длину массива
    if (hashTags.length > HASHTAG_MAX_NUM) {
      hashTagTextBox.setCustomValidity('нельзя указывать больше пяти хэш-тегов');
      hashTagTextBox.style.border = '5px solid red';
      return;
    } else {
      hashTagTextBox.setCustomValidity('');
      hashTagTextBox.style.border = '1px solid blue';
    }
    // проверка на дубликаты
    if (hasDuplicates(hashTags)) {
      hashTagTextBox.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
      hashTagTextBox.style.border = '5px solid red';
      return;
    } else {
      hashTagTextBox.setCustomValidity('');
      hashTagTextBox.style.border = '1px solid blue';
    }
    for (var index = 0; index < hashTags.length; ++index) {
      var hashtag = hashTags[index];
      if (hashtag[0] !== '#') {
        hashTagTextBox.setCustomValidity('хэш-тег должен начинаться с символа # (решетка)');
        hashTagTextBox.style.border = '5px solid red';
        break;
      }
      if (hashtag.length <= 1) {
        hashTagTextBox.setCustomValidity('хеш-тег не может состоять только из одной решетки');
        hashTagTextBox.style.border = '5px solid red';
        break;
      }
      if (hashtag.length > HASHTAG_MAX_LENGTH) {
        hashTagTextBox.setCustomValidity('максимальная длина одного хэш-тега - 20 символов, включая решетку');
        hashTagTextBox.style.border = '5px solid red';
        break;
      } else {
        hashTagTextBox.setCustomValidity('');
        hashTagTextBox.style.border = '1px solid blue';
      }
    }
  });
  hashTagTextBox.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      evt.stopPropagation();
    }
  });
  // проверка комментариев
  commentTextBox.addEventListener('invalid', function () {
    if (commentTextBox.validity.tooLong) {
      commentTextBox.setCustomValidity('длина комментария не может быть больше 140 символов');
      commentTextBox.style.border = '5px solid red';
    } else {
      commentTextBox.setCustomValidity('');
    }
  });
  // изменение размера изображения
  controlValue.setAttribute('value', '100%');
  var zoom = function () {
    if (controlValue.value !== '100%') {
      var val = controlValue.getAttribute('value');
      var val2 = val.slice(0, -1);
      controlValue.setAttribute('value', parseInt(val2, 10) + STEP + '%');
      preview.style.transform = 'scale(' + (parseInt(val2, 10) + STEP) / 100 + ')';
    }
  };
  var reductImg = function () {
    if (controlValue.value !== '25%') {
      var val = controlValue.getAttribute('value');
      var val2 = val.slice(0, -1);
      controlValue.setAttribute('value', parseInt(val2, 10) - STEP + '%');
      preview.style.transform = 'scale(' + (parseInt(val2, 10) - STEP) / 100 + ')';
    }
  };
  controlBig.addEventListener('click', function () {
    zoom();
  });
  controlSmall.addEventListener('click', function () {
    reductImg();
  });
  var cleanValuesForm = function () {
    controlValue.setAttribute('value', '100%');
    originalRadioBtn.checked = true;
    hashTagTextBox.value = '';
    commentTextBox.value = '';
  };
  if ('content' in document.createElement('template')) {
    var successTemplate = document.querySelector('#success');
    var main = document.getElementsByTagName('main');
  }
  var showTemplate = function (template) {
    var successTemplateElem = document.querySelector('.success');
    if (successTemplateElem === null) {
      var clone = document.importNode(template.content, true);
      main[0].appendChild(clone);
    } else {
      successTemplateElem.classList.remove('visually-hidden');
    }
  };
  var onSuccess = function () {
    document.querySelector('.img-upload__message--loading').classList.add('visually-hidden');
    showTemplate(successTemplate);
    var successTemplateBtn = document.querySelector('.success__button');
    var successForm = document.querySelector('.success');
    var inner = document.querySelector('.success__inner');
    successTemplateBtn.addEventListener('click', function () {
      successForm.classList.add('visually-hidden');
      returnOriginal();
      cleanValuesForm();
    });
    successTemplateBtn.addEventListener('keydown', function (evt) {
      if ((evt.keyCode === window.ENTER_KEYCODE) && (successTemplateBtn === document.activeElement)) {
        successForm.classList.add('visually-hidden');
        returnOriginal();
        cleanValuesForm();
      }
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        if (successForm) {
          successForm.classList.add('visually-hidden');
          returnOriginal();
          cleanValuesForm();
        }
      }
    });
    inner.addEventListener('click', function (evt) {
      evt.cancelBubble = true;
    });
    successForm.addEventListener('click', function () {
      successForm.classList.add('visually-hidden');
      returnOriginal();
      cleanValuesForm();
    });
    closeForm();
  };
  var onError = function (errorMessage) {
    document.querySelector('.img-upload__message--loading').classList.add('visually-hidden');
    var error = window.errorTemplate.cloneNode(true);
    error.querySelector('.error__title').textContent = errorMessage;
    window.main.appendChild(error);
    showTemplate(window.errorTemplate);
    closeForm();
  };
})();
