'use strict';
(function () {
  var popularFilter = document.getElementById('filter-popular');
  var randomFilter = document.getElementById('filter-random');
  var discussFilter = document.getElementById('filter-discussed');
  var filter = function (filterID) {
    var photos;
    switch (filterID) {
      case 'popularFilter':
        window.clearPhotosContainer();

        window.fillInPhotosContainer(window.originPhotos);
        break;
      case 'randomFilter':
        window.clearPhotosContainer();
        photos = [];
        while (photos.length < 10) {
          var randomIndex = getRandom(window.originPhotos);
          if (photos.indexOf(window.originPhotos[randomIndex]) === -1) {
            photos.push(window.originPhotos[randomIndex]);
          }
        }
        window.fillInPhotosContainer(photos);
        break;
      case 'discussFilter':
        window.clearPhotosContainer();
        photos = window.originPhotos.slice();
        photos.sort(sortDiscussed);
        window.fillInPhotosContainer(photos);
        break;
    }
  };
  var sortDiscussed = function (a, b) {
    return b.comments.length - a.comments.length;
  };
  var getRandom = function (arr) {
    return Math.floor(Math.random() * arr.length);
  };
  popularFilter.addEventListener('click', function () {
    popularFilter.classList.add('img-filters__button--active');
    discussFilter.classList.remove('img-filters__button--active');
    randomFilter.classList.remove('img-filters__button--active');
    filter('popularFilter');
  });
  randomFilter.addEventListener('click', function () {
    popularFilter.classList.remove('img-filters__button--active');
    discussFilter.classList.remove('img-filters__button--active');
    randomFilter.classList.add('img-filters__button--active');
    filter('randomFilter');
  });
  discussFilter.addEventListener('click', function () {
    popularFilter.classList.remove('img-filters__button--active');
    randomFilter.classList.remove('img-filters__button--active');
    discussFilter.classList.add('img-filters__button--active');
    filter('discussFilter');
  });
})();
