/*globals  $*/
"use strict";
exports.htmlHelper = function () {
  var that =  {
    populateSelect : function (select, array, initialValue, className) {
      if (className) {
        select.addClass(className);
      }
      if (initialValue) {
        select.append($("<option>").text(initialValue));
      }
      array.forEach(function (item) {
        select.append($("<option>").text(item));
      });
    }
  };
  return that;
};
