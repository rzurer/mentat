/*jslint browser: true*/
/*global  window, localStorage, $*/
"use strict";
var initialize = function () {
    var common, module, editInPlace, editInPlaceDocument;
    common = require('../modules/common').common(localStorage);
    editInPlace = require('../modules/editInPlace').editInPlace();
    editInPlaceDocument = require('../modules/editInPlaceDocument').editInPlaceDocument(editInPlace);
    module = require('../modules/module').module(common, editInPlaceDocument);
    window.module = module;
  };
initialize();

