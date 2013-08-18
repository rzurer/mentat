/*globals  $*/
"use strict";
exports.router = function (urls, window, postFunction) {
  return {
    getDocumentNames : function (callback) {
      postFunction(urls.getDocumentNames, null, callback);
    },
    getDocumentLines : function (documentName, callback) {
      postFunction(urls.getDocumentLines, {documentName : documentName}, callback);
    }
  };
};