'use strict';

// Отправка на сервер и получение с сервера информации

(function () {
  var UPLOAD_URL = 'https://js.dump.academy/keksobooking';
  var DOWNLOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 1;

  var makeRequest = function (onLoad, onError, xhr) {
    xhr.responseType = 'json';

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;
  }


  var upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    makeRequest(onLoad, onError, xhr);
    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  };


  var download = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    makeRequest(onLoad, onError, xhr);
    xhr.open('GET', DOWNLOAD_URL);
    xhr.send();
  };

  window.backend = {
    download: download,
    upload: upload
  };

})();
