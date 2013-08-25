/*globals  $*/
"use strict";
exports.editInPlaceControl = function (eventListener) {
  var that = {
      addListener : eventListener.addListener,
      enterEditMode : function (control) {
        control.setSelected(true);
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
        control.setSelected = function (isSelected) {
          control.selected = isSelected;
          eventListener.fire("selected", [control.id]);
          if (isSelected) {
            control.number.addClass('isSelected');
            return;
          }
          control.number.removeClass('isSelected');
        };
        control.read.click(function () {
          control.enterEditMode();
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
          control.setSelected(false);
          control.read.show();
          control.write.hide();
        };
        return control;
      }
    };
  return that;
};