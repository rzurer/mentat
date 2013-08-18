/*globals  $*/
"use strict";
exports.editInPlaceDocument = function (editInPlaceControlFactory) {
  var editInPlaceControls = [],
    currentIndex = 0,
    parentHtmlControl,
    leaveEditMode = function () {
      editInPlaceControls.forEach(function (editInPlaceControl) {
        if (editInPlaceControl.id !== currentIndex) {
          editInPlaceControl.leaveEditMode();
        }
      });
    },
    editCallback = function (index) {
      currentIndex = index;
      leaveEditMode();
    },
    appendControl = function (line) {
      var editInPlaceControl = editInPlaceControlFactory.create(editInPlaceControls.length, line);
      editInPlaceControls.push(editInPlaceControl);
      parentHtmlControl.append(editInPlaceControl.container);
    },
    editNext = function () {
      if (currentIndex < editInPlaceControls.length - 1) {
        currentIndex += 1;
      } else {
        currentIndex = 0;
      }
      editInPlaceControls[currentIndex].enterEditMode();
    },
    onKeyDown = function (e) {
      if (e.keyCode === 13 && e.ctrlKey) {
        leaveEditMode();
        appendControl({number : editInPlaceControls.length + 1, text : ''});
        currentIndex = editInPlaceControls.length - 1;
        editInPlaceControls[currentIndex].enterEditMode();
        return;
      }
      if (e.keyCode === 9 || e.keyCode === 13) {
        e.preventDefault();
        editNext();
      }
    },
    display = function (parent, sourceLines) {
      parentHtmlControl = parent;
      $('body').keydown(onKeyDown);
      sourceLines.forEach(function (line) {
        appendControl(line, parentHtmlControl);
      });
    };
  editInPlaceControlFactory.addListener("edit", editCallback);
  return { display : display};
};