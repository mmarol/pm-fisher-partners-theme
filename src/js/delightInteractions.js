import $ from "jquery";

let container = $(".delights__images");
let containerWidth = container.width();
let containerHeight = container.height();
let itemWidth = 280;
let itemHeight = 280;
let maxWidth = containerWidth - itemWidth;
let maxHeight = containerHeight - itemHeight;
let delights = $(".delight__item");
let detailClose = $(".delight__close");
let detailOpen = $(".delight__image");
let randX;
let randY;
let imageHeight;

randomizeOrder(delights);
randomizePosition(delights);
hideDetails(detailClose);
showDetails(detailOpen);

// make elements draggable, and add a class if they are being dragged
delights.draggable({
	stack: ".delight__item",
	start: function (event, ui) {
		$(this).addClass("dragging");
	},
});

// reset the max width variables on window resize
$(window).on("resize", function () {
	descriptionHeight = $(".delights__description").height();
	containerWidth = container.width();
	containerHeight = container.height();
	maxWidth = containerWidth - itemWidth;
	maxHeight = containerHeight - itemHeight;
});

// on clicking an image, add css classes to expand and reposition item, while hiding the rest
function showDetails(item) {
	item.on("click", function (event) {
		// only trigger the action if the element is not being dragged
		if ($(this).closest(".delight__item").hasClass("dragging")) {
			$(this).closest(".delight__item").removeClass("dragging");
		} else {
			$(this)
				.closest(".delight__item")
				.addClass("expand")
				.siblings()
				.addClass("hide");
		}
	});
}

// on clicking the close button, remove the expand and hide classes, and randomly reposition elements
function hideDetails(item) {
	item.on("click", function () {
		delights.removeClass("hide").siblings().removeClass("expand");
		randomizePosition(delights);
	});
}

// randomize the order of elements, so that a random set shows
function randomizeOrder(selector) {
	// if the item exists
	if (selector) {
		// find the parent
		selector.parent().each(function () {
			// for each parent
			$(this)
				// find the children
				.children(selector)
				// get a random sort order
				.sort(function () {
					return Math.random() - 0.5;
				})
				// remove the children from the parent
				.detach()
				// append the children with the new order
				.appendTo(this);
		});
	}

	return this;
}

// randomize the position of the elements in the container
function randomizePosition(selector) {
	selector.each(function () {
		imageHeight = $(this).find(".delight__image").attr("height");
		randX = Math.random() * maxWidth + 1;
		randY = Math.random() * (container.height() - imageHeight) + 1;
		$(this).css({
			left: "calc(" + (randX / containerWidth) * 100 + "%)",
			top: "calc(" + (randY / container.height()) * 100 + "%)",
		});
	});
}
