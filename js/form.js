'use strict';

// Валидация формы

(function () {
  var adForm = document.querySelector('.ad-form');
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var MIN_PRICES = [10000, 1000, 5000, 0];

  // Соответствие количества комнат и гостей

  var roomOptionsSelect = adForm.querySelector('#room_number');
  var capacityOptionsSelect = adForm.querySelector('#capacity');

  var checkGuestHousing = function (select) {
    var currentRoomNumber = parseInt(roomOptionsSelect.value, 10);
    var currentCapacity = parseInt(capacityOptionsSelect.value, 10);
    roomOptionsSelect.setCustomValidity('');
    capacityOptionsSelect.setCustomValidity('');
    if ((currentRoomNumber === 100) && (currentCapacity !== 0)) {
      select.setCustomValidity('Такое жилище не предназначено для гостей');
    } else if ((currentRoomNumber !== 100) && (currentCapacity === 0)) {
      select.setCustomValidity('Нужно выбрать как миниму одного гостя');
    } else if ((currentCapacity > 0) && (currentRoomNumber < currentCapacity)) {
      select.setCustomValidity('В жилье с ' + currentRoomNumber + ' комнатой(-ами) может проживать не более ' + currentRoomNumber + ' гостей');
    } else {
      roomOptionsSelect.setCustomValidity('');
      capacityOptionsSelect.setCustomValidity('');
    }
  };

  checkGuestHousing(roomOptionsSelect);

  roomOptionsSelect.addEventListener('change', function () {
    checkGuestHousing(roomOptionsSelect);
  });

  capacityOptionsSelect.addEventListener('change', function () {
    checkGuestHousing(capacityOptionsSelect);
  });

  // Соответствие типа жилья минимальной цене

  var typeOptionsSelect = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');

  var setMinPrice = function () {
    var currentType = typeOptionsSelect.value;
    var currentMinPrice;

    for (var i = 0; i < TYPES.length; i++) {
      if (currentType === TYPES[i]) {
        currentMinPrice = MIN_PRICES[i];
      }
    }
    priceInput.placeholder = currentMinPrice;
    priceInput.min = currentMinPrice;
  };

  setMinPrice();

  typeOptionsSelect.addEventListener('change', function () {
    setMinPrice();
    priceInput.value = '';
  });

  // Синхронизация времени заезда и выезда

  var timeInOptionsSelect = adForm.querySelector('#timein');
  var timeOutOptionsSelect = adForm.querySelector('#timeout');

  timeInOptionsSelect.addEventListener('change', function () {
    timeOutOptionsSelect.value = timeInOptionsSelect.value;
  });

  timeOutOptionsSelect.addEventListener('change', function () {
    timeInOptionsSelect.value = timeOutOptionsSelect.value;
  });
})();
