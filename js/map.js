'use strict';

// Преобразование в активное состояние и перетаскивание метки

(function () {
  var ENTER_KEY = 'Enter';
  var CLICK = 1;
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

  var getPinX = function (pinButton) {
    return parseInt(pinButton.style.left, 10) + Math.round(pinXOffset);
  };

  var getPinY = function (pinButton) {
    return parseInt(pinButton.style.top, 10) + Math.round(pinYOffset);
  };

  var getPinAddress = function (pinButton) {

    return getPinX(pinButton) + ', ' + getPinY(pinButton);
  };

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

  var makeOtherActive = function () {
    document.querySelector('.map').classList.remove('map--faded');
    window.pins.renderAll(window.data.mockAds);
    window.card.addCardTemplate();
  };

  var onPinMouseDown = function (pin) {
    pin.addEventListener('mousedown', function (evt) {

      if (evt.which === CLICK) {
        evt.preventDefault();

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
          } else if (getPinY(pin) < pinTopBorder) {
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
          makeFormsActive();
          makeOtherActive();
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      }
    });
  };

  onPinMouseDown(mapPinMain);

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      makeFormsActive();
      makeOtherActive();
    }
  });

})();
