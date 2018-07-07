var Carousel = (function () {

	function scrollLeft(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		evt.stopImmediatePropagation();

		if (position > 0) {
			position = Math.max(0,position - 250);
		}

		$items.css({ left: (-position) + "px" });
	}

	function scrollRight(evt){
		evt.preventDefault();
		evt.stopPropagation();
		evt.stopImmediatePropagation();

		if (position < maxPosition) {
			position = Math.min(maxPosition,position + 250);
		}

		$items.css({ left: (-position) + "px" });
	}

	function init() {

		$content = $("[rel=js-carousel] > [rel=js-content]");
		$items = $content.children("[rel=js-items]");
		$left = $("[rel=js-carousel] > [rel=js-controls] > [rel=js-left]");
		$right = $("[rel=js-carousel] > [rel=js-controls] > [rel=js-right]");


		contentWidth = $content.width();
		itemsWidth = $items.width();
		position = 0;
		maxPosition = (itemsWidth - contentWidth);

		// attach click handlers for the `$left` and `$right` buttons,
		// that call the `scrollLeft(..)` and `scrollRight(..)` functions,
		// respectively
		$left.on("click",scrollLeft);
		$right.on("click",scrollRight);

	}
	var $content, $items, $left, $right, contentWidth, itemsWidth, position, maxPosition;

	return {
		init: init
	};
})();

$(document).ready(Carousel.init);
