'use strict';
(function () {
  var urlMax = 25;
  window.urlMax = urlMax;
  var randoms = [];
  var descriptions = ['шикарный город!', 'а я на море', 'в отпуске', 'так и работаем', 'мимими', 'огонь!'];
  var messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var avatars = ['avatar-1.svg', 'avatar-2.svg', 'avatar-3.svg', 'avatar-4.svg', 'avatar-5.svg', 'avatar-6.svg'];
  var names = ['Иван', 'Андрей', 'Ирина', 'Елена', 'Денис', 'Вероника'];
  var maxUsers = 6;
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  window.ENTER_KEYCODE = ENTER_KEYCODE;
  window.ESC_KEYCODE = ESC_KEYCODE;
  window.getRandom = function (minVal, maxVal) {
    return Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
  };
  for (var i = 0; i < urlMax; i++) {
    var randomNum = window.getRandom(1, urlMax);
    while (randoms.length < urlMax) {
      if (randoms.indexOf(randomNum) === -1) {
        randoms.push(randomNum);
      } else {
        randomNum = window.getRandom(1, urlMax);
      }
    }
  }
  // window.getRandom = getRandom();
  window.usersData = {
    generatePhotos: function () {
      var photos = [];
      for (i = 0; i < urlMax; i++) {

        photos.push({
          url: 'photos/' + randoms[i] + '.jpg',
          description: descriptions[window.getRandom(0, maxUsers - 1)],
          likes: window.getRandom(15, 200),
          comments: window.usersData.generateComments()
        });
      }
      return photos;
    },
    generateComments: function () {
      var comments = [];
      for (var j = 0; j < window.getRandom(1, 10); j++) {
        comments.push({
          avatar: avatars[window.getRandom(0, maxUsers - 1)],
          message: messages[window.getRandom(0, maxUsers - 1)],
          name: names[window.getRandom(0, maxUsers - 1)]
        });
      }
      return comments;
    }
  };
})();
