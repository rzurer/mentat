/*globals  $*/
"use strict";
exports.router = function (urls, window, postFunction) {
  return {
    getDocumentNames : function (callback) {
      postFunction(urls.getDocumentNames, null, callback);
    },
    getDocumentNames : function (callback) {
      postFunction(urls.getDocumentNames, null, callback);
    }
  };
};