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
		control = {
			enterEditMode : function () {
				control.read.hide();
				control.write.show();
				control.write.select();
			},
			leaveEditMode : function () {
				control.read.show();
				control.write.hide();
			},
			initialize : function (line) {
				control.container = $('<div>').attr('id', line.number).addClass('edit-in-place');
				control.number = $('<span>').addClass('number').text(line.number);
				control.read = $('<span>').addClass('read').text(line.text);
				control.write = $('<input>').attr('type', 'text').addClass('write').val(line.text);
				control.container.append(control.number, control.read, control.write);
				assignEventHandlers(control);
			}
		};
	return control;
};
