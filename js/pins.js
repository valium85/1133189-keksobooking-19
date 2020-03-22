'use strict';

// Блок отрисовки моков-пинов

(function () {
  var ENTER_KEY = 'Enter';
  var PIN_X_OFFSET = 50 / 2; // Смещение по горизонтали для кончика булавки относительно л/в угла элемента
  var PIN_Y_OFFSET = 70; // Смещение по вертикали для кончика булавки л/в угла элемента
  var MAX_PINS_ALLOWED = 5;
  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

  var renderMockPin = function (mock) {
    var mockPin = pinTemplate.cloneNode(true);

    mockPin.style.left = (mock.location.x - PIN_X_OFFSET) + 'px';
    mockPin.style.top = (mock.location.y - PIN_Y_OFFSET) + 'px';
    mockPin.querySelector('img').src = mock.author.avatar;
    mockPin.querySelector('img').alt = mock.offer.title;
    mockPin.addEventListener('click', function () {
      var previousPin = mapPins.querySelector('.map__pin--active');
      if (previousPin) {
        previousPin.classList.remove('map__pin--active');
      }

      mockPin.classList.add('map__pin--active');
      window.card.renderCard(mock);

    });
    mockPin.addEventListener('keydown', function (evt) {
      if (evt.key === ENTER_KEY) {
        window.card.renderCard(mock);
      }
    });
    return mockPin;
  };// Функция для отрисовки пина, на вход принимает данные из архива, сгенерированного раньше (объект)

  var renderAllMocks = function (mocksArr) {
    var fragment = document.createDocumentFragment();
    var count = mocksArr.length > MAX_PINS_ALLOWED ? MAX_PINS_ALLOWED : mocksArr.length;

    for (var i = 0; i < count; i++) {
      fragment.appendChild(renderMockPin(mocksArr[i]));
    }
    mapPins.appendChild(fragment);
  };// Cоздает фрагмент с пинами, потом отрисовывает весь фрагмент

  window.pins = {
    renderPin: renderMockPin,
    renderAll: renderAllMocks,
    pinsData: []
  };

})();
