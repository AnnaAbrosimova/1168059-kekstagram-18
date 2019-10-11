'use strict';
var photos = [];
var urlMax = 25;
var randoms = [];
var descriptions = ['шикарный город!', 'а я на море', 'в отпуске', 'так и работаем', 'мимими', 'огонь!'];
var messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var avatars = ['avatar-1.svg', 'avatar-2.svg', 'avatar-3.svg', 'avatar-4.svg', 'avatar-5.svg', 'avatar-6.svg'];
var names = ['Иван', 'Андрей', 'Ирина', 'Елена', 'Денис', 'Вероника'];
var maxUsers = 6;
var getRandom = function (minVal, maxVal) {
  return Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
};
for (var i = 0; i < urlMax; i++) {
  var randomNum = getRandom(1, urlMax);
  while (randoms.length < urlMax) {
    if (randoms.indexOf(randomNum) === -1) {
      randoms.push(randomNum);
    } else {
      randomNum = getRandom(1, urlMax);
    }
  }
}
for (i = 0; i < urlMax; i++) {
  var comments = [];
  for (var j = 0; j < getRandom(1, 10); j++) {
    comments.push({
      avatar: avatars[getRandom(0, maxUsers - 1)],
      message: messages[getRandom(0, maxUsers - 1)],
      name: names[getRandom(0, maxUsers - 1)]
    });
  }
  photos.push({
    url: 'photos/' + randoms[i] + '.jpg',
    description: descriptions[getRandom(0, maxUsers - 1)],
    likes: getRandom(15, 200),
    comments: comments
  });
}
var similarListElement = document.querySelector('.pictures');
var similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var renderPhotos = function (photo) {
  var photoElement = similarPictureTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').setAttribute('src', photo.url);
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  return photoElement;
};
var fragment = document.createDocumentFragment();
for (i = 0; i < urlMax; i++) {
  fragment.appendChild(renderPhotos(photos[i]));
}
similarListElement.appendChild(fragment);

// ЗАДАНИЕ 3.3
document.querySelector('.big-picture').classList.remove('hidden');
var bigPicture = document.querySelector('.big-picture');
bigPicture.querySelector('.big-picture__img').setAttribute('src', photos[0].url);
bigPicture.querySelector('.likes-count').textContent = photos[0].likes;
bigPicture.querySelector('.comments-count').textContent = photos[0].comments.length;
document.querySelector('.social__caption').textContent = photos[0].description;
var socComment = document.querySelector('.social__comments');
for (j = 0; j < photos[0].comments.length; j++) {
  socComment.querySelector('.social__picture').setAttribute('src', 'img/avatar-' + getRandom(1, 6) + '.svg');
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
// ЗАДАНИЕ 4.1
var ESC_KEYCODE = 27;
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
  if ((evt.keyCode === ESC_KEYCODE) && (commentTextBox !== document.activeElement)) {
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
function hasDublicates(arr) {
  var newArr = [];
  for (i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i] !== -1)) {
      return true;
    }
    newArr.push(arr[i]);
  }
  return false;
}
hashTagTextBox.addEventListener('change', function () {
  var str = hashTagTextBox.value.toUpperCase().trim();
  var array = str.split(' ');
  // проверка на длину массива
  if (array.length > 5) {
    hashTagTextBox.setCustomValidity('нельзя указать больше пяти хэш-тегов');
    return;
  } else {
    hashTagTextBox.setCustomValidity('');
  }
  // проверка на дубликаты
  if (hasDublicates(array)) {
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
    if (hashtag.length > 20) {
      hashTagTextBox.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
      break;
    } else {
      hashTagTextBox.setCustomValidity('');
    }
  }
});
hashTagTextBox.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
});
// })
// проверка комментариев
commentTextBox.addEventListener('change', function () {
  if (commentTextBox.value.length > 140) {
    commentTextBox.setCustomValidity('длина комментария не может составлять больше 140 символов');
  } else {
    commentTextBox.setCustomValidity('');
  }
});
