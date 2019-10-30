'use strict';
(function () {
  var ACCEPT_PROCESS = 200;
  window.load = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === ACCEPT_PROCESS) {
        onSuccess(xhr.response);
        window.preview();
        window.respPhotos = xhr.response;
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 10000;
    xhr.open('GET', url);
    xhr.send();
  };
  window.upload = function (url, data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === ACCEPT_PROCESS) {
        onSuccess();
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.open('POST', url);
    xhr.send(data);
  };
})();
