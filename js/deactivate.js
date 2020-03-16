'use strict';

// Преобразование в неактивное состояние

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormItems = adForm.children;
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersItems = mapFilters.children;

  (function () {
    for (var i = 0; i < adFormItems.length; i++) {
      adFormItems[i].setAttribute('disabled', 'disabled');
    }

    for (var j = 0; j < mapFiltersItems.length; j++) {
      mapFiltersItems[j].setAttribute('disabled', 'disabled');
    }
  })();
})();
