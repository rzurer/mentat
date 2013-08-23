/*globals  $*/
var control = function (id, line, eventListener) {
  var that = {
    id : id,
    container : $('<div>').addClass('edit-in-place'),
    number : $('<span>').addClass('number').text(line.number),
    read : $('<span>').addClass('read').text(line.text),
    write : $('<input>').attr('type', 'text').addClass('write').val(line.text),
    isSelected : function (isSelected) {
      if (isSelected) {
        that.number.addClass('selected');
        return;
      }
      that.number.removeClass('selected');
    },
    assignEventHandlers : function () {
      that.read.click(that.enterEditMode);
      that.write.change(function () {
        var text = that.write.val();
        that.read.text(text);
        eventListener.fire("change", [that.id, text]);
      });
    },
    intialize : function () {
      that.assignEventHandlers();
      that.container.append(that.number, that.read, that.write);
    },
    enterEditMode : function () {
      that.read.hide();
      that.write.show();
      that.write.select();
      that.eventListener.fire("edit", [that.id]);
    },
    leaveEditMode : function () {
      that.read.show();
      that.write.hide();
    }
  };
  return {
    line : line,
    leaveEditMode : that.leaveEditMode,
    enterEditMode : that.enterEditMode,
    container : that.container,
    addListener : eventListener.addListener
  };
};

