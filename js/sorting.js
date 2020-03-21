'use strict';

// Сортировка и показ похожих объявлений

(function () {
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
    return (valueFilter === 'any') || (valueFilter === valuePin);
  };

  var checkPrice = function (valuePin, valueFilter) {

    switch (valueFilter) {
      case 'low': {
        return valuePin < 10000;
      }

      case 'middle': {
        return (valuePin >= 10000) && (valuePin <= 50000);
      }

      case 'high': {
        return (valuePin > 50000);
      }

      default:
      case 'any': {
        return true;
      }
    }
  };

  var checkRooms = function (valuePin, valueFilter) {
    return (valueFilter === 'any') || (parseInt(valueFilter, 10) === valuePin);
  };

  var checkGuests = function (valuePin, valueFilter) {
    return (valueFilter === 'any') || (parseInt(valueFilter, 10) === valuePin);
  };

  var getActiveFeatures = function () {
    var featureFilters = map.querySelector('.map__features');
    var featuresList = featureFilters.querySelectorAll('input[type="checkbox"]');
    var activeFeatures = [];
    for (var i = 0; i < featuresList.length; i++) {
      if (featuresList[i].checked) {
        activeFeatures.push(featuresList[i].value);
      }
    }
    return activeFeatures;
  };

  var checkFeatures = function (pinFeatures, filterFeatures) {
    return filterFeatures.every(function (item) {
      return pinFeatures.indexOf(item) !== -1;
    });
  };

  var filterPins = function (pinsArr, paramsObj) {
    return pinsArr.filter(function (item) {
      return checkType(item.offer.type, paramsObj.housingType) &&
      checkPrice(item.offer.price, paramsObj.housingPrice) &&
      checkRooms(item.offer.rooms, paramsObj.housingRooms) &&
      checkGuests(item.offer.guests, paramsObj.housingGuests) &&
      checkFeatures(item.offer.features, paramsObj.features);
    });
  };

  mapFilters.addEventListener('change', window.debounce(function () {
    var housingType = mapFilters.querySelector('#housing-type').value;
    var housingPrice = mapFilters.querySelector('#housing-price').value;
    var housingRooms = mapFilters.querySelector('#housing-rooms').value;
    var housingGuests = mapFilters.querySelector('#housing-guests').value;

    var filterState = {
      housingType: housingType,
      housingPrice: housingPrice,
      housingRooms: housingRooms,
      housingGuests: housingGuests,
      features: getActiveFeatures()
    };

    var pinsFiltered = filterPins(window.pins.pinsData, filterState);

    var popupCard = document.querySelector('.popup');
    popupCard.classList.add('hidden');

    clearPins();
    window.pins.renderAll(pinsFiltered);
  }));
})();
