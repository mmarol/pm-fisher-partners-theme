import $ from "jquery";

export { openMenu, closeMenu, lightenMenu, darkenMenu, invertNav, switchLogo };

let menuOpen = $("#header__hamburger--open");
let menuClose = $("#header__hamburger--close");
let menu = $(".header__secondary");
let menuBar = $(".header__primary");
let menuInvertSection = $(".invert-nav");
let sectionBounds;

function openMenu() {
	menuOpen.attr("aria-expanded", "true");
	menu.addClass("show");
}

function closeMenu() {
	menuOpen.attr("aria-expanded", "false");
	menu.removeClass("show");
}

function lightenMenu() {
	menuBar.addClass("inverted");
}

function darkenMenu() {
	menuBar.removeClass("inverted");
}

function invertNav(invertSection) {
	if (invertSection) {
		let sectionBounds = invertSection.get(0).getBoundingClientRect();
		$(window).on("scroll", function () {
			if (
				$(window).scrollTop() >= sectionBounds.top &&
				$(window).scrollTop() <= sectionBounds.bottom
			) {
				lightenMenu();
			} else {
				darkenMenu();
			}
		});
	}
}

function switchLogo(switchSection) {
	if (switchSection) {
		let sectionBounds = switchSection.get(0).getBoundingClientRect();
		$(window).on("scroll", function () {
			if (
				$(window).scrollTop() >= sectionBounds.top &&
				$(window).scrollTop() <= sectionBounds.bottom
			) {
				$(".header__logo--simplified").removeClass("show");
				$(".header__logo--stacked").addClass("show");
			} else {
				$(".header__logo--stacked").removeClass("show");
				$(".header__logo--simplified").addClass("show");
			}
		});
	}
}

menuOpen.on("click", function () {
	openMenu();
});

menuClose.on("click", function () {
	closeMenu();
});
