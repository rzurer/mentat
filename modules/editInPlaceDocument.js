/*globals  $*/
"use strict";
exports.editInPlaceDocument = function (common, editInPlaceControl) {
  var controlsArray = [],
    currentIndex = 0,
    parentHtmlControl,
    createLine = function (number, text) {
      return {number: number, text : text};
    },
    getLines = function () {
      return controlsArray.map(function (item) {
        return item.line;
      });
    },
    leaveEditMode = function () {
      controlsArray.forEach(function (item) {
        if (item.id !== currentIndex) {
          item.leaveEditMode();
        }
      });
    },
    editCallback = function (index) {
      currentIndex = index;
      leaveEditMode();
    },
    changeCallback = function (id, text) {
      controlsArray.forEach(function (item) {
        if (item.id === id) {
          item.line.text = text;
        }
      });
      common.placeInLocalStorage('test', getLines());
    },
    appendControl = function (line) {
      var item = editInPlaceControl.create(controlsArray.length, line);
      controlsArray.push(item);
      parentHtmlControl.append(item.container);
    },
    editNext = function () {
      if (currentIndex < controlsArray.length - 1) {
        currentIndex += 1;
      } else {
        currentIndex = 0;
      }
      controlsArray[currentIndex].enterEditMode();
    },
    onKeyDown = function (e) {
      if (e.keyCode === 13 && e.ctrlKey) {
        leaveEditMode();
        appendControl({number : controlsArray.length + 1, text : ''});
        currentIndex = controlsArray.length - 1;
        controlsArray[currentIndex].enterEditMode();
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
  editInPlaceControl.addListener("edit", editCallback);
  editInPlaceControl.addListener("change", changeCallback);
  return { display : display};
};