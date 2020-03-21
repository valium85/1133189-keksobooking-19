'use strict';

// Блок отрисовки моков-пинов

(function () {
  var ENTER_KEY = 'Enter';
  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

  var pinXOffset = 50 / 2; // Смещение по горизонтали для кончика булавки относительно л/в угла элемента
  var pinYOffset = 70; // Смещение по вертикали для кончика булавки л/в угла элемента

  var renderMockPin = function (mock) {
    var mockPin = pinTemplate.cloneNode(true);

    mockPin.style.left = (mock.location.x - pinXOffset) + 'px';
    mockPin.style.top = (mock.location.y - pinYOffset) + 'px';
    mockPin.querySelector('img').src = mock.author.avatar;
    mockPin.querySelector('img').alt = mock.offer.title;
    mockPin.addEventListener('click', function () {
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
    var count = mocksArr.length > 5 ? 5 : mocksArr.length;

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
