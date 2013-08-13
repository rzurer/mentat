/*globals  $*/
"use strict";
var editInPlace = require('editInPlace');
exports.editInPlaceDocument = function (parent, sourceLines) {
	var controls = [],
		initializeWorkArea = function () {
			controls.forEach(function (control) {
				control.leaveEditMode();
			});
		},
		appendControl = function (line) {
			var control = editInPlace(line);
			controls.push(control);
			parent.append(control);
			return control;
		},
		getNextControl = function (number) {
			controls.forEach(function (control) {
				if (control.number === number + 1) {
					return control;
				}
			});
		},
		editNext = function (ctrl) {
			var number = ctrl.parent().attr('id'),
				nextControl = getNextControl(number);
			if (nextControl) {
				nextControl.enterEditMode();
				return;
			}
			controls[0].enterEditMode();
		},
		onKeyDown = function (e) {
			if (e.keyCode === 13 && e.ctrlKey) {
				var control = appendControl();
				control.write.keydown(onKeyDown);
				return;
			}
			if (e.keyCode === 9 || e.keyCode === 13) {
				e.preventDefault();
				editNext(this);
			}
		},

		display = function () {
			sourceLines.forEach(appendControl);
			initializeWorkArea();
		};
	return display;
};