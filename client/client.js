/*jslint browser: true*/
/*global  window, localStorage, $*/
"use strict";
var postFunction = function (url, input, callback) {
    $.ajax({
      type: 'POST',
      url: url,
      data: input,
      success: function (output) {
        if (callback) {
          callback(output);
        }
      }
    });
  },
  initialize = function () {
    var eventListener, common, mentat, editInPlaceControl, editInPlaceDocument, fileClerk, fs, byline, documentsPath, urls, router, htmlHelper;
    urls = require('../modules/urls').urls;
    router = require('../modules/router').router(urls, window, postFunction);
    eventListener = require('../modules/eventListener').eventListener();
    common = require('../modules/common').common(localStorage);
    editInPlaceControl = require('../modules/editInPlaceControl').editInPlaceControl(eventListener);
    editInPlaceDocument = require('../modules/editInPlaceDocument').editInPlaceDocument(editInPlaceControl);
    htmlHelper = require('../modules/htmlHelper').htmlHelper();
    mentat = require('../modules/mentat').mentat(common, router, editInPlaceDocument);
    window.mentat = mentat;
    window.htmlHelper = htmlHelper;
  };
initialize();
