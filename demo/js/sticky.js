(function(WIN, DOC, rAF) {
	var container = [];

	var scrolling = false,
		canSticky = false,
		tmpId = 'sticky' + (+new Date),
		tmpObj = "<div id='" + tmpId + "' style='display: none;visibility: hidden;position: sticky;'></div>";

	$(DOC.body).append(tmpObj);
	tmpObj = $('#' + tmpId);
	canSticky = tmpObj.css("position") == "sticky" ? true : false;
	tmpObj.remove();

	function watch() {
		$(WIN).on("scroll", function() {
			scrolling = true;
		});
		rAF(function() {
			var top = $(DOC.body).scrollTop(),
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
					if (top > curObj["pos"]) {
						if (curObj.sticky) {

						} else {
							curObj.sticky = true;
							curObj.origin.css("position", "fixed");
							curObj.origin.css("top", "0");
							$.isFunction(curObj["begin"]) && curObj.begin.call(curObj["origin"]);
						}
					} else {
						if (curObj.sticky) {
							curObj.origin.css("position", curObj["position"]);
							curObj.origin.css("top", curObj["top"]);
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
		sticky: function(begin, end) {
			var origin = $(this);
			canSticky ? origin.css("position", "sticky") : container.push({
				origin: origin,
				begin: begin,
				end: end,
				sticky: false,
				pos: origin.offset().top,
				position: origin.css("position"),
				top: origin.css("top")
			});
			return origin;
		}
	});
	!canSticky && watch();
})(window, document, window["requestAnimationFrame"] || window["webkitRequestAnimationFrame"] || window["mozRequestAnimationFrame"] || function(callback) {
	setTimeout(callback, 1000 / 60);
});