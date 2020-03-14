'use strict';

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var CLICK = 1;

// Преобразование в неактивное состояние

var adForm = document.querySelector('.ad-form');
var adFormItems = adForm.children;
var mapFilters = document.querySelector('.map__filters');
var mapFiltersItems = mapFilters.children;

var makeFormsUnactive = function () {
  for (var i = 0; i < adFormItems.length; i++) {
    adFormItems[i].setAttribute('disabled', 'disabled');
  }

  for (var j = 0; j < mapFiltersItems.length; j++) {
    mapFiltersItems[j].setAttribute('disabled', 'disabled');
  }
};

makeFormsUnactive();

// Блок генерации моков

var ADS = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TYPES_RUS = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
var MIN_PRICES = [10000, 1000, 5000, 0];
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

var getRandomArray = function (arr) {
  var randomArray = [];
  var indexesList = getRandomIndexesArr(arr);
  for (var i = 0; i < indexesList.length; i++) {
    randomArray[i] = arr[indexesList[i]];
  }
  return randomArray;
};// Берет массив строк, делает из него массив произвольной длины из этих же строк <= входного

var getImageIndexes = function (quantity) {
  var imageIndexes = getIndexesArr(quantity);

  for (var i = 0; i < imageIndexes.length; i++) {
    imageIndexes[i]++;
  }

  return imageIndexes;
};// Создает отдельный рандомно отсортированный массив для номеров аватарок, от 1 до числа объявлений (ADS)

var generateAuthor = function (imageIndex) {
  return {
    avatar: 'img/avatars/user0' + imageIndex + '.png'
  };
};// Создает объект с ключом и строчкой адреса картинки, на вход берет индекс из предыдущей функции

var generateOffer = function () {
  return {
    title: 'Сдается жилое помещение в центре Токио',
    address: getRandomInt(100, 1000) + ', ' + getRandomInt(100, 1000),
    price: getRandomInt(10000, 20000),
    type: TYPES[getRandomInt(0, 3)],
    rooms: getRandomInt(1, 10),
    guests: getRandomInt(1, 10),
    checkin: CHECK_TIMES[getRandomInt(0, 2)],
    checkout: CHECK_TIMES[getRandomInt(0, 2)],
    features: getRandomArray(FEATURES_LIST),
    description: 'У нас вы сможете комфортно отдохнуть и удобно обустроиться на время отдыха',
    photos: getRandomArray(PHOTOS_LIST)
  };
};

var generateLocation = function () {
  return {
    x: getRandomInt(0, DESKTOP_WIDTH - 100),
    y: getRandomInt(130, 630)
  };
};

var generateMocks = function (mocksNumber) {
  var imageIndexes = getImageIndexes(mocksNumber);
  var mocks = [];
  for (var i = 0; i < mocksNumber; i++) {
    mocks[i] = {
      author: generateAuthor(imageIndexes[i]),
      offer: generateOffer(),
      location: generateLocation()
    };
  }
  return mocks;
};

var mockAds = generateMocks(ADS); // Массив из 8 генерирующихся объектов

// Блок отрисовки моков-пинов

var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var pinXOffset = 65 / 2; // Смещение по горизонтали для кончика булавки относительно л/в угла элемента
var pinYOffset = 65 + 22; // Смещение по вертикали для кончика булавки л/в угла элемента

var renderMockPin = function (mock) {
  var mockPin = pinTemplate.cloneNode(true);

  mockPin.style.left = (mock.location.x + pinXOffset) + 'px';
  mockPin.style.top = (mock.location.y + pinYOffset) + 'px';
  mockPin.querySelector('img').src = mock.author.avatar;
  mockPin.querySelector('img').alt = mock.offer.title;
  mockPin.addEventListener('click', function () {
    renderCard(mock);
  });
  mockPin.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      renderCard(mock);
    }
  });
  return mockPin;
};// Функция для отрисовки пина, на вход принимает данные из архива, сгенерированного раньше (объект)

var renderAllMocks = function (mocksArr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < mocksArr.length; i++) {
    fragment.appendChild(renderMockPin(mocksArr[i]));
  }
  mapPins.appendChild(fragment);
};// Cоздает фрагмент с пинами, потом отрисовывает весь фрагмент


// Блок отрисовки карточки

var getHousingType = function (mock) {
  for (var i = 0; i < TYPES.length; i++) {
    if (TYPES[i] === mock.offer.type) {
      var typeRus = TYPES_RUS[i];
      break;
    }
  }
  return typeRus;
};

var map = document.querySelector('.map');
var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup');

var renderCardTemplate = function (mock) {
  var card = cardTemplate.cloneNode(true);
  card.querySelector('.popup__avatar').src = mock.author.avatar;
  card.querySelector('.popup__title').textContent = mock.offer.title;
  card.querySelector('.popup__text--price').textContent = mock.offer.price + '₽/ночь';
  card.querySelector('.popup__type').textContent = getHousingType(mock);
  card.querySelector('.popup__text--capacity').textContent = mock.offer.rooms + ' комнат для ' + mock.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + mock.offer.checkin + ', выезд до ' + mock.offer.checkout;
  card.querySelector('.popup__description').textContent = mock.offer.description;
  return card;
};

var renderFeatures = function (mock) {
  var featuresList = document.querySelector('.popup__features');
  featuresList.innerHTML = '';

  for (var j = 0; j < mock.offer.features.length; j++) {
    var newFeature = document.createElement('li');
    var featureClass = 'popup__feature--' + mock.offer.features[j];
    newFeature.classList.add('popup__feature');
    newFeature.classList.add(featureClass);
    featuresList.appendChild(newFeature);
  }

  return featuresList;
};

var renderPhotos = function (mock) {
  var photosBlock = document.querySelector('.popup__photos');
  var photo = document.querySelector('.popup__photo');
  photosBlock.innerHTML = '';

  for (var j = 0; j < mock.offer.photos.length; j++) {
    var newPhoto = photo.cloneNode(true);
    newPhoto.src = mock.offer.photos[j];
    photosBlock.appendChild(newPhoto);
  }

  return photosBlock;
};

var renderCard = function (mock) {
  map.insertBefore(renderCardTemplate(mock), document.querySelector('.map__filters-container'));
  renderFeatures(mock);
  renderPhotos(mock);

  var popupWindow = map.querySelector('.popup');
  var popupCloseButton = popupWindow.querySelector('.popup__close');

  popupCloseButton.addEventListener('click', function () {
    popupWindow.remove();
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.key === ESC_KEY) {
      popupWindow.remove();
    }
  });
};

// Преобразование в активное состояние

var mapPinMain = document.querySelector('.map__pin--main');
var formAddress = adForm.querySelector('#address');


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
  renderAllMocks(mockAds);
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

// Валидация формы

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
