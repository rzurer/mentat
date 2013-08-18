/*globals  $, window, localStorage*/
"use strict";
window.initializeMentat = function () {
  var healthCheck = function (date) {
      $('.banner').text(date);
    },
    displayDocumentNames = function (documentNames) {
      var select = $('#documentsSelect');
      window.htmlHelper.populateSelect(select, documentNames, '< none >', 'documentsSelect');
    },
    initializeDocument = function (sourceLines) {
      var parent = $('.workArea');
      window.mentat.displayDocument(parent, sourceLines);
    },
    displayDocument = function () {
      var documentName = $(this).val();
      window.mentat.getDocumentLines(documentName, initializeDocument);
    },
    assignEventHandlers = function () {
      $('#documentsSelect').change(displayDocument);
    };
  $(function () {
    window.mentat.heartbeat(healthCheck);
    window.mentat.getDocumentNames(displayDocumentNames);
    assignEventHandlers();
  });
};