/*globals $*/

"use strict";
exports.module = function (common) {
	var
		that = {
			tempStorageSlot : "TranscriptName",
			heartbeat: function (callback) {
				if (callback) {
					callback('The current date is ' + common.getCurrentDateTime());
				}
			},
			appendLine : function () {
				var value = $(this).val(),
					transcript = common.getFromLocalStorage(that.tempStorageSlot) || [];
				transcript.push(value);
				//common.placeInLocalStorage(tempStorageSlot, transcript);
			}
		};
	return that;
};