/*globals  $, window, localStorage*/
"use strict";
var initializeModule = function (sourceLines) {
  var healthCheck = function (date) {
      $('.moduleContainer').text(date);
    };
  $(function () {
    window.module.heartbeat(healthCheck);
    window.module.editInPlaceDocument.display($('.workArea'), sourceLines);
  });
};