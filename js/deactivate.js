'use strict';

// Преобразование в неактивное состояние

(function () {
  var map = document.querySelector('.map');
  var mapPinsBlock = map.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');
  var defaultXPin = 570;
  var defaultYPin = 375;
  var adForm = document.querySelector('.ad-form');
  var adFormItems = adForm.children;
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersItems = mapFilters.children;

  var clearPins = function () {
    var pinsFilled = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pinsFilled.length; i++) {
      mapPinsBlock.removeChild(pinsFilled[i]);
    }
  };

  var deactivate = function () {
    clearPins();
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapPinMain.style.left = defaultXPin + 'px';
    mapPinMain.style.top = defaultYPin + 'px';

    for (var i = 0; i < adFormItems.length; i++) {
      adFormItems[i].setAttribute('disabled', 'disabled');
    }

    for (var j = 0; j < mapFiltersItems.length; j++) {
      mapFiltersItems[j].setAttribute('disabled', 'disabled');
    }
  };

  deactivate();

  window.deactivate = deactivate;
})();
