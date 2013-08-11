/*globals  $, window, localStorage*/
"use strict";
var initializeModule = function (lines) {
	var healthCheck = function (date) {
			$('.moduleContainer').text(date);
		},
		initializeWorkArea = function () {
			$(".workArea").find('input').hide();
			$(".workArea").find('span').show();
		},
		leaveInput = function () {
			initializeWorkArea();
			$(this).prev('span').text($(this).val());
		},
		editInPlace = function () {
			initializeWorkArea();
			$(this).fadeOut(function () {
				$(this).next('input').fadeIn();
				$(this).next('input').focus();
			});
		},
		editNext = function (control) {
			initializeWorkArea();
			var span = $(control).parent().next("div").find('span'),
				input = span.next('input');
			if (input) {
				span.hide();
				input.show();
				input.select();
			}
		},
		displayDocument = function () {
			lines.forEach(function (line) {
				var div = $('<div>').addClass('edit-in-place');
				div.append($('<span>').text(line.text));
				div.append($('<input>').attr('type', 'text').val(line.text));
				$(".workArea").append(div);
			});
		},
		assignEventHandlers = function () {
			$('.edit-in-place span').click(editInPlace);
			$('.edit-in-place input').keydown(function (e) {
				console.log(e.keyCode);
				if (e.keyCode === 9 || e.keyCode === 13) {
					e.preventDefault();
					editNext(this);
				}
			});
		};
	$(function () {
		window.module.heartbeat(healthCheck);
		displayDocument();
		assignEventHandlers();
	});
};