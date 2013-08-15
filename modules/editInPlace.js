/*globals  $*/
"use strict";
exports.editInPlace = function () {
  var assignEventHandlers = function (control) {
      control.container.click(control.enterEditMode);
      control.read.click(control.enterEditMode);
      control.write.change(function () {
        control.read.text(control.write.val());
      });
    },
    editInPlace = {
      enterEditMode : function () {
        editInPlace.read.hide();
        editInPlace.write.show();
        editInPlace.write.select();
      },
      leaveEditMode : function () {
        editInPlace.read.show();
        editInPlace.write.hide();
      },
      initialize : function (line) {
        editInPlace.container = $('<div>').addClass('edit-in-place');
        editInPlace.number = $('<span>').addClass('number').text(line.number);
        editInPlace.read = $('<span>').addClass('read').text(line.text);
        editInPlace.write = $('<input>').attr('type', 'text').attr('id', line.number).addClass('write').val(line.text);
        editInPlace.container.append(editInPlace.number, editInPlace.read, editInPlace.write);
        assignEventHandlers(editInPlace);
      }
    };
  return editInPlace.container;
};
