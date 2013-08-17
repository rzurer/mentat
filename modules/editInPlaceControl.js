/*globals  $*/
"use strict";
exports.editInPlaceControl = function (eventListener) {
  var that =  {
    addListener : function (type, listener) {
      eventListener.addListener(type, listener);
    },
    removeListener : function (type, listener) {
      eventListener.removeListener(type, listener);
    },
    enterEditMode : function (control) {
      control.read.hide();
      control.write.show();
      control.write.select();
      eventListener.fire("edit", [control.id]);
    },
    create : function (id, line) {
      var control = {};
      control.id = id;
      control.container = $('<div>').addClass('edit-in-place');
      control.number = $('<span>').addClass('number').text(line.number);
      control.read = $('<span>').addClass('read').text(line.text);
      control.write = $('<input>').attr('type', 'text').addClass('write').val(line.text);
      control.read.click(function () {
        that.enterEditMode(control);
      });
      control.write.change(function () {
        control.read.text(control.write.val());
      });
      control.container.append(control.number, control.read, control.write);
      control.enterEditMode = function () {
        that.enterEditMode(control);
      };
      control.leaveEditMode = function () {
        control.read.show();
        control.write.hide();
      };
      return control;
    }
  };
  return that;
};
