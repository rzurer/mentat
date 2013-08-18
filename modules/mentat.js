/*globals $*/
"use strict";
exports.mentat = function (common, router) {
  var that = {
      heartbeat: function (callback) {
        if (callback) {
          callback('The current date is ' + common.getCurrentDateTime());
        }
      },
      getDocumentNames : function (callback) {
        router.getDocumentNames(callback);
      }
      getDocumentNames : function (callback) {
        router.getDocumentNames(callback);
      }
    };
  return that;
};