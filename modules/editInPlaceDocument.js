/*globals  $*/
"use strict";
exports.editInPlaceDocument = function (editInPlaceControl) {
  var controls = [],
    controlIndex = 0,
    parentControl,
    leaveEditMode = function () {
      controls.forEach(function (control) {
        if (control.id !== controlIndex) {
          control.leaveEditMode();
        }
      });
    },
    editCallback = function (index) {
      controlIndex = index;
      leaveEditMode();
    },
    appendControl = function (line) {
      var control = editInPlaceControl.create(controls.length, line);
      controls.push(control);
      parentControl.append(control.container);
    },
    editNext = function () {
      if (controlIndex < controls.length - 1) {
        controlIndex += 1;
      } else {
        controlIndex = 0;
      }
      controls[controlIndex].enterEditMode();
    },
    onKeyDown = function (e) {
      if (e.keyCode === 13 && e.ctrlKey) {
        leaveEditMode();
        appendControl({number : controls.length + 1, text : ''});
        controlIndex = controls.length -1;
        controls[controlIndex].enterEditMode();
        return;
      }
      if (e.keyCode === 9 || e.keyCode === 13) {
        e.preventDefault();
        editNext();
      }
    },
    display = function (parent, sourceLines) {
      parentControl = parent;
      $('body').keydown(onKeyDown);
      sourceLines.forEach(function (line) {
        appendControl(line, parentControl);
      });
    };
  editInPlaceControl.addListener("edit", editCallback);
  return { display : display};
};