/*globals  $*/
"use strict";
exports.editInPlace = function (line) {
	var control = {
			enterEditMode : function () {
				this.read.hide();
				this.write.show();
				this.write.select();
			},
			leaveEditMode : function () {
				this.read.show();
				this.write.hide();
			}
		},
		save = function (event) {
			var text = control.write.val() + event.shiftKey ? String.fromCharCode(event.keyCode) : String.fromCharCode(event.keyCode).toLowerCase();
			control.read.text(text);
		},
		initialize = function () {
			control.container = $('<div>').attr('id', line.number).addClass('edit-in-place');
			control.number = $('<span>').addClass('number').text(line.number);
			control.read = $('<span>').addClass('read').text(line.text).click(control.enterEditMode);
			control.write = $('<input>').attr('type', 'text').addClass('write').val(line.text).keydown(save);
			control.container.append(control.number, control.read, control.write);
		};
	initialize();
	return control;
};
