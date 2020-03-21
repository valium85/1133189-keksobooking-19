'use strict';

// Все главные действия на основной карте, включая сценарии сервера

(function () {
  var ENTER_KEY = 'Enter';
  var CLICK = 1;
  var main = document.querySelector('main');
  var adForm = document.querySelector('.ad-form');
  var adFormItems = adForm.children;
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersItems = mapFilters.children;
  var mapPinMain = document.querySelector('.map__pin--main');
  var formAddress = adForm.querySelector('#address');
  var pinLeftBorder = 0;
  var pinRightBorder = 1200;
  var pinTopBorder = 130;
  var pinBottomBorder = 630;
  var pinXOffset = 65 / 2;
  var pinYOffset = 65 + 22;

  // Сценарии работы с сервером

  var onDownloadError = function (errorMessage) {
    var errorPopup = main.querySelector('.error');
    var errorText = errorPopup.querySelector('.error__message');

    var showMessage = function () {
      errorText.textContent = errorMessage;
      errorPopup.classList.remove('hidden');
    };

    setTimeout(showMessage, 500);
    showMessage();
  };

  var onDownloadSuccess = function (pinsArr) {
    document.querySelector('.map').classList.remove('map--faded');
    window.card.addCardTemplate();
    window.pins.renderAll(pinsArr);
    makeFormsActive();
    window.pins.pinsData = pinsArr;
  };

  // Вычисление координат пина

  var getPinX = function (pinButton) {
    return parseInt(pinButton.style.left, 10) + Math.round(pinXOffset);
  };

  var getPinY = function (pinButton) {
    return parseInt(pinButton.style.top, 10) + Math.round(pinYOffset);
  };

  var getPinAddress = function (pinButton) {

    return getPinX(pinButton) + ', ' + getPinY(pinButton);
  };

  formAddress.value = getPinAddress(mapPinMain);

  // Активация карты

  var makeFormsActive = function () {
    for (var i = 0; i < adFormItems.length; i++) {
      adFormItems[i].removeAttribute('disabled');
    }

    for (var j = 0; j < mapFiltersItems.length; j++) {
      mapFiltersItems[j].removeAttribute('disabled');
    }

    adForm.classList.remove('ad-form--disabled');
    formAddress.value = getPinAddress(mapPinMain);
  };

  var isUnactive = document.querySelector('.map').classList.contains('map--faded');

  var onPinMouseDown = function (pin) {
    pin.addEventListener('mousedown', function (evt) {
      if (evt.which === CLICK) {
        evt.preventDefault();

        if (isUnactive) {
          window.backend.download(onDownloadSuccess, onDownloadError);
        }

        var startCoords = {
          x: evt.clientX,
          y: evt.clientY
        };

        var onMouseMove = function (moveEvt) {
          moveEvt.preventDefault();

          var shift = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY
          };

          startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
          };

          pin.style.top = (pin.offsetTop - shift.y) + 'px';
          pin.style.left = (pin.offsetLeft - shift.x) + 'px';

          if (getPinX(pin) < pinLeftBorder) {
            pin.style.left = (pinLeftBorder - pinXOffset) + 'px';
          } else if (getPinX(pin) > pinRightBorder) {
            pin.style.left = (pinRightBorder - pinXOffset) + 'px';
          }

          if (getPinY(pin) < pinTopBorder) {
            pin.style.top = (pinTopBorder - pinYOffset) + 'px';
          } else if (getPinY(pin) > pinBottomBorder) {
            pin.style.top = (pinBottomBorder - pinYOffset) + 'px';
          }

          formAddress.value = getPinAddress(pin);
        };

        var onMouseUp = function (upEvt) {
          upEvt.preventDefault();

          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      }
    });
  };

  onPinMouseDown(mapPinMain);

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      window.backend.download(onDownloadSuccess, onDownloadError);
    }
  });

  // Отправка формы

  var onUploadSuccess = function () {
    window.deactivate();
    main.querySelector('.success').classList.remove('hidden');
  };

  var onUploadError = function () {
    main.querySelector('.error').classList.remove('hidden');
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(adForm), onUploadSuccess, onUploadError);
    evt.preventDefault();
  });

  // Сброс формы

  var clearButton = adForm.querySelector('.ad-form__reset');
  clearButton.addEventListener('click', function () {
    window.deactivate();
  });
})();
