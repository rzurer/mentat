/*jslint browser: true*/
/*global  window, localStorage, $*/
"use strict";
var initialize = function () {
    var eventListener, common, module, editInPlaceControl, editInPlaceDocument;
    eventListener = require('../modules/eventListener').eventListener();
    common = require('../modules/common').common(localStorage);
    editInPlaceControl = require('../modules/editInPlaceControl').editInPlaceControl(eventListener);
    editInPlaceDocument = require('../modules/editInPlaceDocument').editInPlaceDocument(editInPlaceControl);
    module = require('../modules/module').module(common, editInPlaceDocument);
    window.module = module;
  };
initialize();

