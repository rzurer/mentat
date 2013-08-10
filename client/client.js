/*jslint browser: true*/
/*global  window, localStorage, $*/
"use strict";
var initialize = function () {
        var common, module;
        common = require('../modules/common').common(localStorage);
        module = require('../modules/module').module(common);
        window.module = module;
    };
initialize();

