/*globals  $, window, localStorage*/
"use strict";
var initializeModule = function () {
	var healthCheck = function (date) {
		$('.moduleContainer').text(date);
	};
	$(function () {
		var obj = window.module,
			index = 0;
		obj.heartbeat(healthCheck);
		var firstLine = localStorage[obj.tempStorageSlot][index].replace(/"/g, "");
		$("#outputSpan").text();
		$("#firstLine").keyup(obj.saveLine);
	});
};