/*globals  $, window, localStorage*/
"use strict";
var initializeModule = function (sourceLines) {
  var healthCheck = function (date) {
      $('.moduleContainer').text(date);
    },
    displayDocument = function () {
      // var line;
      // sourceLines.forEach(function (sourceLine) {
      //   var editInPlaceControl = createEditInPlaceControl(sourceLine),
      //   line = getLine(editInPlaceControl);
      //   workArea().append(editInPlaceControl);
      //   line.read.click(editInPlace);
      //   line.write.keydown(onKeyDown);
      //   line.write.change(save);
      // });
    };
  $(function () {
    window.module.heartbeat(healthCheck);
    displayDocument();
  });
};