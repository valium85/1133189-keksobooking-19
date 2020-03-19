'use strict';

// Блок всплывающих окон

(function () {

  var ESC_KEY = 'Escape';
  var main = document.querySelector('main');

  var successTemplate = document.querySelector('#success')
        .content
        .querySelector('.success');
  var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');


  var getPopupMessage = function (template) {
    var popupMessage = template.cloneNode(true);
    popupMessage.classList.add('hidden');

    document.addEventListener('click', function () {
      popupMessage.classList.add('hidden');
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.key === ESC_KEY) {
        popupMessage.classList.add('hidden');
      }
    });
    return popupMessage;
  };

  var renderSuccessMessage = function () {
    var successMessage = getPopupMessage(successTemplate);
    main.appendChild(successMessage);
  };

  var renderErrorMessage = function () {
    var errorMessage = getPopupMessage(errorTemplate);
    main.appendChild(errorMessage);
  };

  renderSuccessMessage();
  renderErrorMessage();
})();
