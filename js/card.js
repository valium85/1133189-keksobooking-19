'use strict';

// Блок отрисовки карточки

(function () {
  var ESC_KEY = 'Escape';
  var TYPES = window.data.TYPES;
  var TYPES_RUS = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];

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

  var addCardTemplate = function () {
    var card = cardTemplate.cloneNode(true);
    card.classList.add('hidden');
    map.insertBefore(card, document.querySelector('.map__filters-container'));

    var cardCloseButton = card.querySelector('.popup__close');

    cardCloseButton.addEventListener('click', function () {
      card.classList.add('hidden');
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.key === ESC_KEY) {
        card.classList.add('hidden');
      }
    });
  };

  var fillCardTemplate = function (mock) {
    var card = map.querySelector('.popup');
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
    var card = map.querySelector('.popup');
    card.classList.remove('hidden');
    fillCardTemplate(mock);
    renderFeatures(mock);
    renderPhotos(mock);
  };

  window.card = {
    addCardTemplate: addCardTemplate,
    renderCard: renderCard
  };
})();
