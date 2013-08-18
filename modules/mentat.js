/*globals $*/
"use strict";
exports.mentat = function (common, router, editInPlaceDocument) {
  var that = {
      heartbeat: function (callback) {
        if (callback) {
          callback('The current date is ' + common.getCurrentDateTime());
        }
      },
      getDocumentNames : function (callback) {
        router.getDocumentNames(callback);
      },
      getDocumentLines : function (documentName, callback) {
        router.getDocumentLines(documentName, callback);
      },
      displayDocument : function (parent, sourceLines) {
        editInPlaceDocument.display(parent, sourceLines);
      }
    };
  return that;
};