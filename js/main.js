'use strict';

// Блок генерации моков

var ADS = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_LIST = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var DESKTOP_WIDTH = 1200;

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}; // Рандомное число в диапазоне от a до b

var getIndexesArr = function (quantity) {
  var indexesArr = [];
  for (var i = 0; i < quantity; i++) {
    indexesArr[i] = i;
    indexesArr.sort(function () {
      return 0.5 - Math.random();
    });
  }
  return indexesArr;
}; // Создает массив нужного количества цифр и сортирует его в рандомном порядке

var getRandomIndexesArr = function (arr) {
  var startLength = arr.length;
  var finalLength = arr.length - getRandomInt(0, arr.length - 1);// чтобы был минимум 1 элемент
  var indexesList = getIndexesArr(startLength);
  for (var i = 0; i < (startLength - finalLength); i++) {
    indexesList.pop();
  }
  return indexesList.sort(function (a, b) {
    return a - b;
  });
}; // принимает на вход массив элементов, создает массив рандомно отсортированных индексов с длиной <= длины
// входного массива, и возвращает его отсортированным по возрастанию

var getFeatures = function (featuresList) {
  var features = '';
  var indexesList = getRandomIndexesArr(featuresList);
  for (var i = 0; i < indexesList.length; i++) {
    if (i < indexesList.length - 1) {
      features += featuresList[indexesList[i]] + ', ';
    } else {
      features += featuresList[indexesList[i]];
    }
  }
  return features;
};// Собирает строку произвольной длины

var getImageIndexes = function (quantity) {
  var imageIndexes = getIndexesArr(quantity);

  for (var i = 0; i < imageIndexes.length; i++) {
    imageIndexes[i]++;
  }

  return imageIndexes;
};// Создает отдельный рандомно отсортированный массив для номеров аватарок, от 1 до числа объявлений (ADS)

var generateAuthor = function (imageIndex) {
  return {
    'avatar': 'img/avatars/user0' + imageIndex + '.png'
  };
};// Создает объект с ключом и строчкой адреса картинки, на вход берет индекс из предыдущей функции

var generateOffer = function () {
  return {
    'title': 'Сдается жилое помещение в центре Токио',
    'address': getRandomInt(100, 1000) + ', ' + getRandomInt(100, 1000),
    'price': getRandomInt(10000, 20000),
    'type': TYPES[getRandomInt(1, 4)],
    'rooms': getRandomInt(1, 10),
    'guests': getRandomInt(1, 10),
    'checkin': CHECK_TIMES[getRandomInt(1, 3)],
    'checkout': CHECK_TIMES[getRandomInt(1, 3)],
    'features': getFeatures(FEATURES_LIST),
    'description': 'У нас вы сможете комфортно отдохнуть и удобно обустроиться на время отдыха',
    'photos': getFeatures(PHOTOS_LIST)
  };
};

var generateLocation = function () {
  return {
    'x': getRandomInt(0, DESKTOP_WIDTH - 100),
    'y': getRandomInt(130, 630)
  };
};

var generateMocks = function (mocksNumber) {
  var imageIndexes = getImageIndexes(mocksNumber);
  var mocks = [];
  for (var i = 0; i < mocksNumber; i++) {
    mocks[i] = {
      'author': generateAuthor(imageIndexes[i]),
      'offer': generateOffer(),
      'location': generateLocation()
    };
  }
  return mocks;
};

var mockAds = generateMocks(ADS); // Массив из 8 генерирующихся объектов

// Блок отрисовки моков-пинов

document.querySelector('.map').classList.remove('map--faded');

var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var renderMockPin = function (mock) {
  var mockPin = pinTemplate.cloneNode(true);

  mockPin.style.left = (mock.location.x + 65 / 2) + 'px';
  mockPin.style.top = (mock.location.y + 65) + 'px';
  mockPin.querySelector('img').src = mock.author.avatar;
  mockPin.querySelector('img').alt = mock.offer.title;

  return mockPin;
};// Функция для отрисовки пина, на вход принимает данные из архива, сгенерированного раньше (объект)

var renderAllMocks = function (mocksArr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < mocksArr.length; i++) {
    fragment.appendChild(renderMockPin(mocksArr[i]));
  }
  mapPins.appendChild(fragment);
};// Cоздает фрагмент с пинами, потом отрисовывает весь фрагмент

renderAllMocks(mockAds);
