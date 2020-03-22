'use strict';

// Преобразование в неактивное состояние

(function () {
  var DEFAULT_X_PIN = 570;
  var DEFAULT_Y_PIN = 375;
  var DEFAULT_ADDRESS = '603, 462';
  var map = document.querySelector('.map');
  var mapPinsBlock = map.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var formAddress = adForm.querySelector('#address');
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
    adForm.reset();
    mapFilters.reset();
    window.setMinPrice();
    formAddress.value = DEFAULT_ADDRESS;

    var popupCard = document.querySelector('.popup');
    if (popupCard) {
      popupCard.classList.add('hidden');
    }

    clearPins();
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapPinMain.style.left = DEFAULT_X_PIN + 'px';
    mapPinMain.style.top = DEFAULT_Y_PIN + 'px';

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
