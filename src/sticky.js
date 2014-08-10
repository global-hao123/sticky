/**
 * @author Cgy
 * @version 1.0.0
 * @description
 *     可能存在z-index遮挡问题
 *
 * 用法：
   var test1 = $("#test1").sticky();
   var test2 = $("#test2").sticky(0, function() {
	  this.css("background-color", "red");
   });
   var test3 = $("#test3").sticky(2, function() {
	  this.css("background-color", "red");
   }, function() {
	  this.css("background-color", "gray");
   });
 *
 */
var $ = window.jQuery || window.require && require('common:widget/ui/jquery/jquery.js');
(function(WIN, DOC, rAF) {
	var container = [];

	var scrolling = false;
	/*var scrolling = false,
		canSticky = false,
		tmpId = 'sticky' + (+new Date),
		tmpObj = "<div id='" + tmpId + "' style='display: none;visibility: hidden;position: sticky;'></div>";

	$(DOC.body).append(tmpObj);
	tmpObj = $('#' + tmpId);
	canSticky = tmpObj.css("position") == "sticky" ? true : false;
	tmpObj.remove();*/

	function watch() {
		$(WIN).on("scroll", function() {
			scrolling = true;
		});
		rAF(function() {
			var top = $(DOC).scrollTop(),
				i = 0,
				j = container.length,
				curObj = null;

			if (scrolling) {
				scrolling = false;
				for (; i < j; i++) {
					curObj = container[i];
					if (curObj.origin.is(":hidden")) {
						continue;
					}
					if (top > curObj["pos"] - curObj["setTop"]) {
						if (curObj.sticky) {

						} else {
							curObj.sticky = true;
							curObj.origin.css({
								"position": "fixed",
								"top": curObj["setTop"]
							});
							$.isFunction(curObj["begin"]) && curObj.begin.call(curObj["origin"]);
						}
					} else {
						if (curObj.sticky) {
							curObj.origin.css({
								"position": curObj["position"],
								"top": curObj["top"]
							});
							curObj.sticky = false;
							$.isFunction(curObj["end"]) && curObj.end.call(curObj["origin"]);
						} else {

						}
					}
				}
			}
			rAF(arguments.callee);
		});
	}
	$.fn.extend({
		sticky: function(top, begin, end) {
			var origin = $(this);
			//canSticky ? origin.css("position", "sticky") : container.push({
			container.push({
				origin: origin,
				begin: begin,
				end: end,
				sticky: false,
				setTop: parseInt(top, 10) || 0,
				pos: origin.offset().top,
				position: origin.css("position"),
				top: origin.css("top")
			});
			return origin;
		}
	});
	//!canSticky && watch();
	watch();
})(window, document, window["requestAnimationFrame"] || window["webkitRequestAnimationFrame"] || window["mozRequestAnimationFrame"] || function(callback) {
	setTimeout(callback, 1000 / 60);
});
