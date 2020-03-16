'use strict';

// Преобразование в активное состояние

var ENTER_KEY = 'Enter';
var CLICK = 1;
var adForm = document.querySelector('.ad-form');
var adFormItems = adForm.children;
var mapFilters = document.querySelector('.map__filters');
var mapFiltersItems = mapFilters.children;
var mapPinMain = document.querySelector('.map__pin--main');
var formAddress = adForm.querySelector('#address');
var pinXOffset = 65 / 2;
var pinYOffset = 65 + 22;

var getPinAddress = function (pinButton) {
  var buttonLeft = pinButton.style.left;
  var buttonTop = pinButton.style.top;
  var x = parseInt(buttonLeft, 10) + Math.round(pinXOffset);
  var y = parseInt(buttonTop, 10) + Math.round(pinYOffset);
  return x + ', ' + y;
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

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.which === CLICK) {
    makeFormsActive();
    makeOtherActive();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    makeFormsActive();
    makeOtherActive();
  }
});
