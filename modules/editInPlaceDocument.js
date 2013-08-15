/*globals  $*/
"use strict";
exports.editInPlaceDocument = function (editInPlace) {
  var controls = [],
    initializeWorkArea = function () {
      controls.forEach(function (control) {
        control.leaveEditMode();
      });
    },
    appendControl = function (parent, line) {
      var control = editInPlace(line);
      controls.push(control);
      parent.append(control);
      return control;
    },
    getNextControl = function (number) {
      controls.forEach(function (control) {
        if (control.number === number + 1) {
          return control;
        }
      });
    },
    editNext = function (ctrl) {
      var number = ctrl.parent().attr('id'),
        nextControl = getNextControl(number);
      if (nextControl) {
        nextControl.enterEditMode();
        return;
      }
      controls[0].enterEditMode();
    },
    onKeyDown = function (e) {
      if (e.keyCode === 13 && e.ctrlKey) {
        var control = appendControl();
        return;
      }
      if (e.keyCode === 9 || e.keyCode === 13) {
        e.preventDefault();
        editNext(this);
      }
    },
    display = function (parent, sourceLines) {
      $('body').keydown(onKeyDown);
      sourceLines.forEach(function (line) {
        appendControl(parent, line);
      });
      initializeWorkArea();
    };
  return display;
};