/*globals $*/
"use strict";
exports.module = function (common, editInPlaceDocument) {
  var that = {
      heartbeat: function (callback) {
        if (callback) {
          callback('The current date is ' + common.getCurrentDateTime());
        }
      }
    };
  return that;
};