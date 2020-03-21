'use strict';

// Сортировка и показ похожих объявлений

var map = document.querySelector('.map');
var mapFilters = map.querySelector('.map__filters');
var mapPinsBlock = map.querySelector('.map__pins');

var clearPins = function () {
  var pinsFilled = map.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var i = 0; i < pinsFilled.length; i++) {
    mapPinsBlock.removeChild(pinsFilled[i]);
  }
};


var checkType = function (valuePin, valueFilter) {
  if ((valueFilter === 'any') || (valueFilter === valuePin)) {
    return true;
  } else {
    return false;
  }
};

var checkPrice = function (valuePin, valueFilter) {
  var priceClass;

  if (valuePin < 10000) {
    priceClass = 'low';
  } else if ((valuePin >= 10000) && (valuePin <= 50000)) {
    priceClass = 'middle';
  } else {
    priceClass = 'high';
  }

  if ((valueFilter === 'any') || (valueFilter === priceClass)) {
    return true;
  } else {
    return false;
  }
};

var checkRooms = function (valuePin, valueFilter) {
  if ((valueFilter === 'any') || (parseInt(valueFilter, 10) === valuePin)) {
    return true;
  } else {
    return false;
  }
};

var checkGuests = function (valuePin, valueFilter) {
  if ((valueFilter === 'any') || (parseInt(valueFilter, 10) === valuePin)) {
    return true;
  } else {
    return false;
  }
};


var filterPins = function (pinsArr, paramsObj) {

  return pinsArr.filter(function (item) {
    return checkType(item.offer.type, paramsObj.housingType) &&
    checkPrice(item.offer.price, paramsObj.housingPrice) &&
    checkRooms(item.offer.rooms, paramsObj.housingRooms) &&
    checkGuests(item.offer.guests, paramsObj.housingGuests);
  });
};


mapFilters.addEventListener('change', function () {
  var housingType = mapFilters.querySelector('#housing-type').value;
  var housingPrice = mapFilters.querySelector('#housing-price').value;
  var housingRooms = mapFilters.querySelector('#housing-rooms').value;
  var housingGuests = mapFilters.querySelector('#housing-guests').value;

  var filterState = {
    housingType: housingType,
    housingPrice: housingPrice,
    housingRooms: housingRooms,
    housingGuests: housingGuests
  };

  // console.log(filterState);
  var pinsFiltered = filterPins(window.pins.pinsData, filterState);

  var popupCard = document.querySelector('.popup');
  popupCard.classList.add('hidden');


  clearPins();
  window.pins.renderAll(pinsFiltered);
  // console.log(pinsFiltered);
});
