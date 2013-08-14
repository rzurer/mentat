/*globals  $, window, localStorage*/
"use strict";
var initializeModule = function (sourceLines) {
	var healthCheck = function (date) {
			$('.moduleContainer').text(date);
		},
		workArea = function () {
			return $(".workArea");
		},
		initializeWorkArea = function () {
			workArea().find('.read').show();
			workArea().find('.write').hide();
		},
		createEditInPlaceControl = function (sourceLine) {
			var editInPlaceControl = $('<div>').addClass('edit-in-place'),
				number = $('<span>').addClass('number').text(sourceLine.number),
				read = $('<span>').addClass('read').text(sourceLine.text),
				write = $('<input>').attr('type', 'text').addClass('write').val(sourceLine.text);
			return editInPlaceControl.append(number, read, write);
		},
		getNextEditInPlaceControl = function (editInPlaceControl) {
			return editInPlaceControl.next(".edit-in-place");
		},
		getFirstEditInPlaceControl = function () {
			return workArea().children(".edit-in-place:first");
		},
		getLine = function (editInPlaceControl) {
			return {
				number : editInPlaceControl.find('.number'),
				read : editInPlaceControl.find('.read'),
				write  : editInPlaceControl.find('.write')
			};
		},
		doEditInPlace = function (line) {
			initializeWorkArea();
			line.read.hide();
			line.write.show();
			line.write.select();
		},
		editInPlace = function () {
			var editInPlaceControl;
			if(this.tagName === 'SPAN') {
				editInPlaceControl = $(this).parent();
			}
			if(this.tagName === 'DIV') {
				editInPlaceControl = $(this);
			}			
			var line = getLine(editInPlaceControl);
			doEditInPlace(line);
		},
		editFirstInPlace = function () {
			doEditInPlace(getLine(getFirstEditInPlaceControl()));
		},
		editNextLine = function (control) {
			var line, editInPlaceControl, nextEditInPlaceControl;
			editInPlaceControl = $(control).parent();
			line = getLine(editInPlaceControl);
			nextEditInPlaceControl = getNextEditInPlaceControl(editInPlaceControl);
			if (!nextEditInPlaceControl.get(0)) {
				editFirstInPlace();
				return;
			}
			line = getLine(nextEditInPlaceControl);
			doEditInPlace(line);
		},
		onKeyDown = function (e) {
			var editInPlaceControl, newEditInPlaceControl, line,
				code = e.keyCode;
			if (code === 13 && e.ctrlKey) {
				newEditInPlaceControl = createEditInPlaceControl({number: 42});
				workArea().append(newEditInPlaceControl);
				assignEventHandlers(newEditInPlaceControl);

				line = getLine(newEditInPlaceControl);
				doEditInPlace(line); //not working unless width is big

				return;
			}
			if (code === 9 || code === 13) {
				e.preventDefault();
				editNextLine(this);
				return;
			}
			editInPlaceControl = $(this).parent();
			line = getLine(editInPlaceControl);
		},
		assignEventHandlers = function (editInPlaceControl) {
			var line = getLine(editInPlaceControl);
			editInPlaceControl.click(editInPlace);
			line.read.click(editInPlace);
			line.write.keydown(onKeyDown);
		},
		save = function () {
			var editInPlaceControl = $(this).parent();
			var line = getLine(editInPlaceControl);
			line.read.text(line.write.val());
		},
		displayDocument = function () {
			var line;
			sourceLines.forEach(function (sourceLine) {
				var editInPlaceControl = createEditInPlaceControl(sourceLine),
					line = getLine(editInPlaceControl);
				workArea().append(editInPlaceControl);
				line.read.click(editInPlace);
				line.write.keydown(onKeyDown);
				line.write.change(save);
			});
		};
	$(function () {
		window.module.heartbeat(healthCheck);
		displayDocument();
	});
};