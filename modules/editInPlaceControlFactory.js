/*globals  $*/
"use strict";
exports.editInPlaceControlFactory = function (eventListener) {
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
    line : {},
    create : function (id, line) {
      var control = {};
      control.line = line;
      control.id = id;

      control.container = $('<div>').addClass('edit-in-place');
      control.number = $('<span>').addClass('number').text(line.number);
      control.read = $('<span>').addClass('read').text(line.text);
      control.write = $('<input>').attr('type', 'text').addClass('write').val(line.text);
      control.isSelected = function (isSelected) {
        if (isSelected) {
          control.number.addClass('selected');
          return;
        }
        control.number.removeClass('selected');
      };
      control.read.click(function () {
        that.enterEditMode(control);
      });
      control.write.change(function () {
        var text = control.write.val();
        control.read.text(text);
        eventListener.fire("change", [control.id, text]);
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
