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
