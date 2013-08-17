/*globals  $*/
"use strict";
exports.editInPlaceControl = function (eventListener) {
  console.log(eventListener);
  var enterEditMode = function (control) {
    control.read.hide();
    control.write.show();
    control.write.select();
    eventListener.fire("edit", [control.id]);
  };
  return {
    addListener : function (type, listener) {
      eventListener.addListener(type, listener);
    },
    removeListener : function (type, listener) {
      eventListener.removeListener(type, listener);
    },
    create : function (line) {
      var control = {};
      control.id = line.number;
      control.container = $('<div>').addClass('edit-in-place');
      control.number = $('<span>').addClass('number').text(control.id);
      control.read = $('<span>').addClass('read').text(line.text);
      control.write = $('<input>').attr('type', 'text').addClass('write').val(line.text);
      control.read.click(function () {
        enterEditMode(control);
      });
      control.write.change(function () {
        control.read.text(control.write.val());
      });
      control.container.append(control.number, control.read, control.write);
      control.leaveEditMode = function () {
        control.read.show();
        control.write.hide();
      };
      return control;
    }
  };
};
