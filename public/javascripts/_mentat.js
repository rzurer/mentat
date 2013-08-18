/*globals  $, window, localStorage*/
"use strict";
var initialize = function () {
  var healthCheck = function (date) {
      $('.banner').text(date);
    },
    displayDocumentNames = function (documentNames) {
      window.htmlHelper.populateSelect($('#documentsSelect'), documentNames, '< none >', 'documentsSelect');
    },
    displayDocument = function () {

    },
    assignEventHandlers = function () {
      $('#documentsSelect').change(displayDocument);
    };
  $(function () {
    window.mentat.heartbeat(healthCheck);
    window.mentat.getDocumentNames(displayDocumentNames);
    window.mentat.editInPlaceDocument.display($('.workArea'), sourceLines);
  });
};